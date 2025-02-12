import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AcademyService } from './academy.service';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
  breadcrumbs$: Observable<MenuItem[]> = this.breadcrumbsSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute, private academyService: AcademyService,) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.generateBreadcrumbs(this.route.root);
    });
  }
  
  public setBreadcrumbs(): void {
    this.generateBreadcrumbs(this.route.root);
  }
  private generateBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): void {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const breadcrumbLabel = child.snapshot.data['breadcrumb'];
      if (breadcrumbLabel) {
        if(breadcrumbs.map(a => a.label).includes(breadcrumbLabel)  === false)
        breadcrumbs.push({ label: breadcrumbLabel, routerLink: url });
      }
      else if (child.snapshot.params['id']) {
      this.academyService.getArticle(child.snapshot.params['id']).subscribe(article => {
          breadcrumbs.push({label: article.name, routerLink: url });
          this.breadcrumbsSubject.next([...breadcrumbs]);
        });
      }
      this.generateBreadcrumbs(child, url, breadcrumbs);
    }

    this.breadcrumbsSubject.next([...breadcrumbs]);
  }

  getBreadcrumbs(): Observable<MenuItem[]> {
    return this.breadcrumbs$;
  }
}
