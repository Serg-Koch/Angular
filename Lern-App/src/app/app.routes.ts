import { Routes } from '@angular/router';
import { CatalogListPage } from './pages/catalog-list-page/catalog-list-page';
import { QuestionListPage } from './pages/question-list-page/question-list-page';
import { QuestionDetailPage } from './pages/question-detail-page/question-detail-page';
import { pagesRoutes } from './pages/pages.routes';

export const routes: Routes = [
    { path: '', component: CatalogListPage},
    ...pagesRoutes
];
