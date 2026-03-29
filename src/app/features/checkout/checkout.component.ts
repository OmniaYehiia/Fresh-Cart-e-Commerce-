import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)

  checkoutForm!: FormGroup;
  cartId :WritableSignal<string | null>= signal('')

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      city: [null, [Validators.required]],
    })

    this.activatedRoute.paramMap.subscribe({
      next:(urlPath)=>{
        this.cartId.set(urlPath.get('cartId'))
      }
    })
  }


  checkoutSession(){
    console.log(this.checkoutForm.value);
    let payload = {
      shippingAddress : this.checkoutForm.value
    }


    
    this.cartService.checkOutSession(this.cartId() , payload).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status == 'success'){
          console.log('entered if condition');
          
          window.open(res.session.url , '_self')
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}
