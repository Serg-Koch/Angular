import { Routes } from "@angular/router";
import { CatalogListPage } from "./catalog-list-page/catalog-list-page";
import { QuestionListPage } from "./question-list-page/question-list-page";
import { QuestionDetailPage } from "./question-detail-page/question-detail-page";

export const pagesRoutes : Routes = [
    {
        path: 'topics/:topicId/catalogs',
        component: CatalogListPage
    },
    {
        path: 'catalog/list/:level',
        component: QuestionListPage
    },
    {
        path: 'list/:level/details/:id',
        component: QuestionDetailPage
    },
];