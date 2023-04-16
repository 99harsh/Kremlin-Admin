import { AppState } from '@/store/state';
import { UiState } from '@/store/ui/state';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { Observable } from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.appService.user;
        console.log("USER", this.user)
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Users',
        iconClasses: 'fas fa-users',
        children: [
            {
                name: 'All Users',
                iconClasses: 'fas fa-user-check',
                path: ['/users/all']
            },
            {
                name: "Active Users",
                iconClasses: 'fas fa-users',
                path: ['/users/active']
            },

            {
                name: 'Pending Users',
                iconClasses: 'fas fa-user-plus',
                path: ['/users/pending']
            },
            {
                name: "Suspended Users",
                iconClasses: "fas fa-user-slash",
                path: ['/users/suspended']
            },
            {
                name: "Rejected Users",
                iconClasses: "fas fa-user-slash",
                path: ['/users/rejected']
            }
        ]
    },
    {
        name:"QR Code",
        iconClasses: 'fas fa-qrcode',
        path: ['/qr/generate']
    },
    {
        name: "Transaction",
        iconClasses: 'fas fa-list',
        children:[
        {
            name: "Claimed Transactions",
            iconClasses: 'fas fa-list',
            path: ['/transaction/claimed']
        },
        {
            name: "Pending Transactions",
            iconClasses: 'fas fa-list',
            path: ['/transaction/pending']
        },
        {
            name: "Settled Transactions",
            iconClasses: 'fas fa-list',
            path: ['/transaction/settled']
        }
    ]
    }
];
