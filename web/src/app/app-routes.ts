import { Routes } from "@angular/router";

import { MainLayoutComponent } from "@abo/common/layouts/main-layout.component";
import { AppConstants } from "@abo/app.constants";
import { AuthGuard } from "@abo/core/auth/auth.guard";

export const routes: Routes = [
    {
        path: "admin",
        component: MainLayoutComponent,
        children: [
            {
                path: AppConstants.Routing.BASE_PRIVATE + "/dashboard",
                canLoad: [AuthGuard],
                loadChildren: () => import("./private/dashboard/dashboard.module").then(mod => mod.DashboardModule)
            },
            {
                path: AppConstants.Routing.BASE_PRIVATE + "/elements",
                canLoad: [AuthGuard],
                loadChildren: () => import("./private/elements/elements.module").then(mod => mod.ElementsModule)
            }
        ]

    },
    {
        path: "",
        loadChildren: () => import("./public/tasks/tasks.module").then(mod => mod.TasksModule)
    },
    {
        path: "login",
        loadChildren: () => import("./public/login/login.module").then(mod => mod.LoginModule)
    },
    {
        path: "",
        redirectTo: "/tasks",
        pathMatch: "full"
    },
    {
        path: "**",
        redirectTo: "/tasks"
    }
];
