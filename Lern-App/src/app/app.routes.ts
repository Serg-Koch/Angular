import { Routes } from '@angular/router';
import { CatalogListPage } from './pages/catalog-list-page/catalog-list-page';
import { QuestionListPage } from './pages/question-list-page/question-list-page';
import { QuestionDetailPage } from './pages/question-detail-page/question-detail-page';

export const routes: Routes = [
    { path: '', component: CatalogListPage},
    { path: 'catalog', component: CatalogListPage},
    { path: 'list', component: QuestionListPage},
    { path: 'details', component: QuestionDetailPage},
];
