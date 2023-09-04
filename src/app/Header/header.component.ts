import { Component, OnDestroy, OnInit } from '@angular/core';
import { SaveRecipeService } from '../services/save-recipe.service';
import { AuthenticationService } from '../auth/authentication.service';
import { User } from '../auth/user.model';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  authSubscription: Subscription;
  constructor(
    private saveRpService: SaveRecipeService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.userSubject.subscribe({
      next: (user: User) => {
        this.isAuthenticated = !!user;
      },
    });
  }

  onSaveRecipe() {
    this.saveRpService.sendRecipe();
  }

  onFetchRecipe() {
    this.saveRpService.getRecipe();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logOut();
  }
}
