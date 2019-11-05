import { ViewMoreComponent } from './components/view-more/view-more.component';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Route[] = [
    { path: '', component: DashboardComponent },
    { path: 'view-more/:config', component: ViewMoreComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ]
})
export class AppRouter {

}