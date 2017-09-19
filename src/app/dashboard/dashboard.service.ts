import { ArticleModel, SelfOnBoardDashboardModel } from './dashboard.models';
import { Injectable } from '@angular/core';
import { HttpService } from '../shared/custom-http';
import { Observable } from 'rxjs/Rx';
// import { Http } from '@angular/http';
import cheerio from 'Cheerio';

@Injectable()
export class DashboardService {

  static ArticlesArr: Array<ArticleModel> = [];
  static LastFetchTime: Date = new Date();
  server = localStorage.getItem('serverName');

  constructor(protected http: HttpService) {

  }
  getDashboardData(timeFrame: number): Observable<SelfOnBoardDashboardModel> {
    const servername = localStorage.getItem('serverName');
    const dashboardUrl = 'http://' + servername + ':4580/sob/api/dashboard?timeFrame=' + timeFrame;
    return this.http.get(dashboardUrl)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not retrieve the  dashboard data'));
  }
  getArticlesArray(body: string): Array<ArticleModel> {
    const dt = (new Date()).getTime();
    const lastFetchTimeMillis = DashboardService.LastFetchTime.getTime();
    const timeDif = dt - lastFetchTimeMillis;
    if (DashboardService.ArticlesArr.length > 0 && timeDif < 600000) {
      // Maximum time of articles cache is 10 minutes
      return DashboardService.ArticlesArr;
    }
    const articlesArr = [];
    const baseUrl = 'http://www.technewsworld.com';
    const $ = cheerio.load(body);
    const articles = $('.section-table');
    articles.map(function () {
      const article = $(this).find('.shadow');
      const articleObj = new ArticleModel(article.find('a').text(), article.find('span').html(), baseUrl + article.find('a').attr('href'), article.find('div').text().replace(/(?:\\[rnt]|[\r\n\t]+)+/g, ''),
        baseUrl + article.find('img').attr('src'));
      articlesArr.push(articleObj);
    }).get();
    DashboardService.LastFetchTime = new Date();
    DashboardService.ArticlesArr = articlesArr;
    return DashboardService.ArticlesArr;
  }
  GetFeed(): Observable<Array<ArticleModel>> {
    const servername = localStorage.getItem('serverName');
    const feedUrl = 'http://' + servername + ':4580/sob/api/GetNewsFeed';
    return this.http.get(feedUrl)
      .map((res) =>
        this.getArticlesArray(res.json())

      )
      .catch((error: any) => Observable.throw(error.json().error || 'Sorry we could not fetch the news'));
  }
}

