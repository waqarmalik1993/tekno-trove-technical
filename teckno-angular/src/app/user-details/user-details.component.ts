import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: any = []
  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.getUser()
  }
  getUser() {
		this.userService.getUser().subscribe(res => {
      if(res.status ==="success")
			this.users = res.data
		})
	}
}
