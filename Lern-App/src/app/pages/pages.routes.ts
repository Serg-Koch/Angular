import { Routes } from "@angular/router";
import { CatalogListPage } from "./catalog-list-page/catalog-list-page";
import { QuestionListPage } from "./question-list-page/question-list-page";
import { QuestionDetailPage } from "./question-detail-page/question-detail-page";

export const pagesRoutes : Routes = [
    {
        path: 'list/:id',
        component: QuestionListPage
    },
    {
        path: 'details/:id',
        component: QuestionDetailPage
    }
];