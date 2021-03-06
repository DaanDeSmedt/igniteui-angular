import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IgxIconModule, IgxGridModule, IgxExcelExporterService, IgxCsvExporterService, IgxOverlayService } from 'igniteui-angular';
import { IgxColumnHidingModule } from 'igniteui-angular';
import { SharedModule } from './shared/shared.module';
import { IgxDragDropModule } from '../../projects/igniteui-angular/src/lib/directives/dragdrop/dragdrop.directive';

import { routing } from './routing';
import { AppComponent } from './app.component';
import { AvatartSampleComponent } from './avatar/avatar.sample';
import { PageHeaderComponent } from './pageHeading/pageHeading.component';
import { BadgeSampleComponent } from './badge/badge.sample';
import { ButtonSampleComponent } from './button/button.sample';
import { CalendarSampleComponent } from './calendar/calendar.sample';
import { CardSampleComponent } from './card/card.sample';
import { CarouselSampleComponent } from './carousel/carousel.sample';
import { ChipsSampleComponent} from './chips/chips.sample';
import { DatePickerSampleComponent } from './date-picker/date-picker.sample';
import { DialogSampleComponent } from './dialog/dialog.sample';
import { DragDropSampleComponent } from './drag-drop/drag-drop.sample';
import { MaskSampleComponent } from './mask/mask.sample';
import { IconSampleComponent } from './icon/icon.sample';
import { InputSampleComponent } from './input/input.sample';
import { InputGroupSampleComponent } from './input-group/input-group.sample';
import { LayoutSampleComponent } from './layout/layout.sample';
import { ListSampleComponent } from './list/list.sample';
import { ListPerformanceSampleComponent } from './list-performance/list-performance.sample';
import { NavbarSampleComponent } from './navbar/navbar.sample';
import { NavdrawerSampleComponent } from './navdrawer/navdrawer.sample';
import { ProgressbarSampleComponent } from './progressbar/progressbar.sample';
import { RippleSampleComponent } from './ripple/ripple.sample';
import { SliderSampleComponent } from './slider/slider.sample';
import { SnackbarSampleComponent } from './snackbar/snackbar.sample';
import { ColorsSampleComponent } from './styleguide/colors/color.sample';
import { ShadowsSampleComponent } from './styleguide/shadows/shadows.sample';
import { TypographySampleComponent } from './styleguide/typography/typography.sample';
import { BottomNavSampleComponent, CustomContentComponent } from './bottomnav/bottomnav.sample';
import { TabsSampleComponent } from './tabs/tabs.sample';
import { TimePickerSampleComponent } from './time-picker/time-picker.sample';
import { ToastSampleComponent } from './toast/toast.sample';
import { RemoteService } from './shared/remote.service';
import { VirtualForSampleComponent } from './virtual-for-directive/virtual-for.sample';
import { LocalService } from './shared/local.service';
import { GridCellEditingComponent } from './grid-cellEditing/grid-cellEditing.component';
import { GridSampleComponent } from './grid/grid.sample';
import { GridColumnMovingSampleComponent } from './grid-column-moving/grid-column-moving.sample';
import { GridColumnPinningSampleComponent } from './grid-column-pinning/grid-column-pinning.sample';
import { GridColumnResizingSampleComponent } from './grid-column-resizing/grid-column-resizing.sample';
import { GridSummaryComponent } from './grid-summaries/grid-summaries.sample';
import { GridPerformanceSampleComponent } from './grid-performance/grid-performance.sample';
import { GridSelectionComponent } from './grid-selection/grid-selection.sample';
import { GridToolbarSampleComponent } from './grid-toolbar/grid-toolbar.sample';
import { GridVirtualizationSampleComponent } from './grid-remote-virtualization/grid-remote-virtualization.sample';
import { ButtonGroupSampleComponent } from './buttonGroup/buttonGroup.sample';
import { GridColumnGroupsSampleComponent } from './grid-column-groups/grid-column-groups.sample';

import { GridGroupBySampleComponent } from './grid-groupby/grid-groupby.sample';
import { DropDownSampleComponent } from './drop-down/drop-down.sample';
import { ComboSampleComponent } from './combo/combo.sample';
import { OverlaySampleComponent } from './overlay/overlay.sample';
import { RadioSampleComponent } from './radio/radio.sample';

const components = [
    AppComponent,
    AvatartSampleComponent,
    BadgeSampleComponent,
    ButtonSampleComponent,
    CalendarSampleComponent,
    CardSampleComponent,
    CarouselSampleComponent,
    ChipsSampleComponent,
    DialogSampleComponent,
    DatePickerSampleComponent,
    DropDownSampleComponent,
    DragDropSampleComponent,
    ComboSampleComponent,
    IconSampleComponent,
    InputSampleComponent,
    InputGroupSampleComponent,
    LayoutSampleComponent,
    ListSampleComponent,
    ListPerformanceSampleComponent,
    MaskSampleComponent,
    NavbarSampleComponent,
    NavdrawerSampleComponent,
    OverlaySampleComponent,
    PageHeaderComponent,
    ProgressbarSampleComponent,
    RippleSampleComponent,
    SliderSampleComponent,
    SnackbarSampleComponent,
    BottomNavSampleComponent,
    TabsSampleComponent,
    TimePickerSampleComponent,
    ToastSampleComponent,
    VirtualForSampleComponent,
    ButtonGroupSampleComponent,
    GridCellEditingComponent,
    GridSampleComponent,
    GridColumnMovingSampleComponent,
    GridColumnPinningSampleComponent,
    GridColumnResizingSampleComponent,
    GridGroupBySampleComponent,
    GridSummaryComponent,
    GridPerformanceSampleComponent,
    GridSelectionComponent,
    GridToolbarSampleComponent,
    GridVirtualizationSampleComponent,
    GridColumnGroupsSampleComponent,

    CustomContentComponent,
    ColorsSampleComponent,
    ShadowsSampleComponent,
    TypographySampleComponent,
    RadioSampleComponent
];

@NgModule({
    declarations: components,
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        IgxIconModule.forRoot(),
        IgxGridModule.forRoot(),
        IgxColumnHidingModule,
        IgxDragDropModule,
        SharedModule,
        routing
    ],
    providers: [
        LocalService,
        RemoteService,
        IgxExcelExporterService,
        IgxCsvExporterService,
        IgxOverlayService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
