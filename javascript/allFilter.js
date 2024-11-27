import { filterByLabel } from './filterByLabel.js';
import { filterByRating, resetForm } from './rating_filter.js';
import { filterByText } from './textFilter.js';
import { filterType } from './type_filter.js';

export function allFilters() {
    filterByLabel();
    filterByRating();
    filterByText();
    filterType();
    resetForm();
}