﻿import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostListener,
    Inject,
    Injectable,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    TemplateRef
} from '@angular/core';
import { animationFrameScheduler, fromEvent, interval, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, throttle } from 'rxjs/operators';
import { IgxGridAPIService } from './api.service';
import { IgxColumnComponent } from "./column.component";
import { IgxDragDirective, IgxDropDirective } from "../directives/dragdrop/dragdrop.directive";
import { IgxForOfDirective } from "../directives/for-of/for_of.directive";

@Directive({
    selector: '[igxResizer]'
})
export class IgxColumnResizerDirective implements OnInit, OnDestroy {

    @Input()
    public restrictHResizeMin: number = Number.MIN_SAFE_INTEGER;

    @Input()
    public restrictHResizeMax: number = Number.MAX_SAFE_INTEGER;

    @Input()
    public resizeEndTimeout = 0;

    @Output()
    public resizeEnd = new Subject<any>();

    @Output()
    public resizeStart = new Subject<any>();

    @Output()
    public resize = new Subject<any>();

    private _left;
    private _destroy = new Subject<boolean>();

    constructor(public element: ElementRef, @Inject(DOCUMENT) public document, public zone: NgZone) {

        this.resizeStart.pipe(
            map((event) => event.clientX),
            takeUntil(this._destroy),
            switchMap((offset) => this.resize.pipe(
                map((event) => event.clientX - offset),
                takeUntil(this.resizeEnd)
            ))
        ).subscribe((pos) => {
            const left = this._left + pos;

            this.left = left < this.restrictHResizeMin ? this.restrictHResizeMin + 'px' : left + 'px';

            if (left > this.restrictHResizeMax) {
                this.left = this.restrictHResizeMax + 'px';
            } else if (left > this.restrictHResizeMin) {
                this.left = left + 'px';
            }
        });

    }

    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            fromEvent(this.document.defaultView, 'mousedown').pipe(takeUntil(this._destroy))
                .subscribe((res) => this.onMousedown(res));

            fromEvent(this.document.defaultView, 'mousemove').pipe(
                takeUntil(this._destroy),
                throttle(() => interval(0, animationFrameScheduler))
            ).subscribe((res) => this.onMousemove(res));

            fromEvent(this.document.defaultView, 'mouseup').pipe(takeUntil(this._destroy))
                .subscribe((res) => this.onMouseup(res));
        });
    }

    ngOnDestroy() {
        this._destroy.next(true);
        this._destroy.unsubscribe();
    }

    public set left(val) {
        requestAnimationFrame(() => this.element.nativeElement.style.left = val);
    }

    onMouseup(event) {
        setTimeout(() => {
            this.resizeEnd.next(event);
            this.resizeEnd.complete();
        }, this.resizeEndTimeout);
    }

    onMousedown(event) {
        this.resizeStart.next(event);
        event.preventDefault();

        const elStyle = this.document.defaultView.getComputedStyle(this.element.nativeElement);
        this._left = Number.isNaN(parseInt(elStyle.left, 10)) ? 0 : parseInt(elStyle.left, 10);
    }

    onMousemove(event) {
        this.resize.next(event);
        event.preventDefault();
    }
}

@Directive({
    selector: '[igxCell]'
})
export class IgxCellTemplateDirective {

    constructor(public template: TemplateRef<any>) { }
}

@Directive({
    selector: '[igxHeader]'
})
export class IgxCellHeaderTemplateDirective {

    constructor(public template: TemplateRef<any>) { }

}

@Directive({
    selector: '[igxGroupByRow]'
})
export class IgxGroupByRowTemplateDirective {

    constructor(public template: TemplateRef<any>) { }

}

@Directive({
    selector: '[igxFooter]'
})
export class IgxCellFooterTemplateDirective {

    constructor(public template: TemplateRef<any>) { }
}

@Directive({
    selector: '[igxCellEditor]'
})
export class IgxCellEditorTemplateDirective {

    constructor(public template: TemplateRef<any>) { }
}

export interface IGridBus {
    gridID: string;
    cdr: ChangeDetectorRef;
    gridAPI: IgxGridAPIService;
}

/**
 * Decorates a setter or a method of a component implementing the IGridBus
 * interface triggering change detection in the parent grid when it is called.
 * If `markForCheck` is set to true it will also mark for check the instance
 * containing the setter/method.
 */
export function autoWire(markForCheck = false) {
    return function decorator(target: IGridBus, name: string, descriptor: any) {
        const old = descriptor.value || descriptor.set;

        const wrapped = function(...args) {
            const result = old.apply(this, args);
            if (markForCheck) {
                this.cdr.markForCheck();
            }
            this.gridAPI.notify(this.gridID);
            return result;
        };

        if (descriptor.set) {
            descriptor.set = wrapped;
        } else if (descriptor.value) {
            descriptor.value = wrapped;
        } else {
            throw Error('Can bind only to setter properties and methods');
        }

        return descriptor;
    };
}

@Injectable()
export class IgxColumnMovingService {
    private _column: IgxColumnComponent;

    get column(): IgxColumnComponent {
        return this._column;
    }
    set column(val: IgxColumnComponent) {
        if (val) {
            this._column = val;
        }
    }
}

@Directive({
    selector: "[igxColumnMovingDrag]"
})
export class IgxColumnMovingDragDirective extends IgxDragDirective {

    @Input("igxColumnMovingDrag")
    set data(val: IgxColumnComponent) {
        this._column = val;
    }

    get column(): IgxColumnComponent {
        return this._column;
    }

    get draggable(): boolean {
        return this.column && this.column.movable;
    }

    private _column: IgxColumnComponent;

    constructor(_element: ElementRef, _zone: NgZone, _renderer: Renderer2, private cms: IgxColumnMovingService) {
        super(_element, _zone, _renderer);
    }

    public onPointerDown(event) {

        const resizeArea = document.elementFromPoint(event.pageX, event.pageY);
        if (!this.draggable || this.element.nativeElement.children[3].isEqualNode(resizeArea)) {
            return;
        }

        this.cms.column = this.column;
        this.ghostImageClass = "igx-grid__drag-ghost-image";
        this.defaultReturnDuration = '0.1s';

        super.onPointerDown(event);

        const args = {
            source: this.column
        };
        this.column.grid.onColumnMovingStart.emit(args);
    }

    public onPointerMove(event) {

        if (!this.draggable) {
            return;
        }
        super.onPointerMove(event);

        if (this._dragStarted && this._dragGhost && !this.column.grid.isColumnMoving) {
            this.column.grid.isColumnMoving = true;
            this.column.grid.cdr.detectChanges();
        }
    }

    public onPointerUp(event) {

        if (!this.draggable) {
            return;
        }

        this.column.grid.isColumnMoving = false;
        this.column.grid.cdr.detectChanges();

        super.onPointerUp(event);
    }

    protected createDragGhost(event) {
        super.createDragGhost(event);

        this._dragGhost.removeChild(this._dragGhost.children[2]);

        this._dragGhost.style.minWidth = null;
        this._dragGhost.style.flexBasis  = null;
        this._dragGhost.style.border  = null;

        const range = document.createRange();
        range.selectNodeContents(this.element.nativeElement.children[1]);

        const s = document.defaultView.getComputedStyle(this.element.nativeElement);
        this.left = this._dragStartX = event.clientX - ((range.getBoundingClientRect().width + parseFloat(s.paddingLeft) + parseFloat(s.paddingRight)) / 2);
        this.top = this._dragStartY = event.clientY - ((range.getBoundingClientRect().height + parseFloat(s.paddingBottom) + parseFloat(s.paddingTop)) / 2);
    }
}

@Directive({
    selector: "[igxColumnMovingDrop]"
})
export class IgxColumnMovingDropDirective extends IgxDropDirective {
    @Input("igxColumnMovingDrop")
    set data(val: any) {
        if (val instanceof IgxColumnComponent) {
            this._column = val;
        }

        if (val instanceof IgxForOfDirective) {
            this._hVirtDir = val;
        }
    }

    get column(): IgxColumnComponent {
        return this._column;
    }

    get isDropTarget(): boolean {
        return this._column && this._column.grid.hasMovableColumns;
    }

    get horizontalScroll(): any {
        if (this._hVirtDir) {
            return this._hVirtDir;
        }
    }

    private _dropIndicator: any = null;
    private _column: IgxColumnComponent;
    private _hVirtDir: IgxForOfDirective<any>;
    private _dragLeave = new Subject<boolean>();
    private _dropIndicatorClass = "igx-grid__drop-indicator-active";

    constructor(private elementRef: ElementRef, private renderer: Renderer2, private cms: IgxColumnMovingService) {
        super();
    }

    public ngOnDestroy() {
        this._dragLeave.next(true);
        this._dragLeave.unsubscribe();
    }

    public onDragEnter(event) {
        if (this.isDropTarget && this.cms.column !== this.column) {
            const args = {
                source: this.cms.column,
                target: this.column,
                cancel: false
            };
            this.column.grid.onColumnMoving.emit(args);

            if (args.cancel) {
                return;
            }

            if (!this.column.pinned || (this.column.pinned && this.column.grid.getPinnedWidth() + parseFloat(event.detail.owner.column.width) <= this.column.grid.calcPinnedContainerMaxWidth)) {
                this._dropIndicator = event.detail.startX < event.detail.clientX ? this.elementRef.nativeElement.children[4] :
                    this.elementRef.nativeElement.children[0];

                this.renderer.addClass(this._dropIndicator, this._dropIndicatorClass);
            }
        }

        if (this.horizontalScroll) {
            interval(100).pipe(takeUntil(this._dragLeave)).subscribe((val) => {
                event.target.id === "right" ? this.horizontalScroll.getHorizontalScroll().scrollLeft += 15 :
                    this.horizontalScroll.getHorizontalScroll().scrollLeft -= 15;
            });
        }
    }

    public onDragLeave(event) {

        if (this._dropIndicator && this.cms.column !== this.column) {
            this.renderer.removeClass(this._dropIndicator, this._dropIndicatorClass);

            const args = {
                source: this.cms.column,
                target: this.column,
                cancel: false
            };
            this.column.grid.onColumnMoving.emit(args);

            if (args.cancel) {
                return;
            }
        }

        if (this.horizontalScroll) {
            this._dragLeave.next(true);
        }
    }

    public onDragDrop(event) {

        if (this.horizontalScroll) {
            this._dragLeave.next(true);
        }

        if (this.isDropTarget) {
            this.column.grid.isColumnMoving = false;
            this.column.grid.cdr.detectChanges();

            const args = {
                source: this.cms.column,
                target: this.column,
                cancel: false
            };
            this.column.grid.onColumnMovingEnd.emit(args);

            if (args.cancel) {
                return;
            }

            this.column.grid.moveColumn(this.cms.column, this.column);
        }
    }
}
