import { browser } from '@wdio/globals';

export default class Page {
    open(url = 'https://www.saucedemo.com/') {
        return browser.url(url);
    }
}