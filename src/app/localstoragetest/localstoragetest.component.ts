import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-localstoragetest',
  templateUrl: './localstoragetest.component.html',
  styleUrls: ['./localstoragetest.component.css']
})
export class LocalstoragetestComponent implements OnInit {

  productForm:FormGroup; // this is our formName, i am using reacitve form.
  productName:any; // this is used for product name
  productPrice:any; // this is used for price
  productAttributes:any; // this is used for attributes
  productquantity:any; // this variable is used for quantity
  productid:any; // this is for product id
  productimageurl:any;  // this varible is used to contain url
  totalAmountOfEachProductByQuantity:any; // this variable is used to calulate product price by qauntity.

  itemjsonArray = [];  // this is a array type varible we used it to store all our product details in it. and then set this array to local storage.
  cartdata; // we fetched all data from local storage and saved in this varible. then foreach this loop in html side.
  cartSize; // this varible is used to get length of array, so we can know items in cart.
  quantityUpdate; //we store our cartdata[index] values in this variable. we using this varible below. in cartQuantityUpdated() and cartQuantityUpdatedRemove() function.

  defaultProductQuantity:number=1; // we ar just using this varible to add quantity 1 very first time when we add product. we used this varible in html form {{defaultProductQuantity}}
  totalCartPrice:number=0; // this varible is used to store totalcartvalue or price.
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.setFormState();  // setting form state by calling this function on initilization, becoz i used reactive form.
    this.getcartDetailsFromlocalStorage(); // this function is to get all data from loca; storage//
    this.totalCartPriceUpdate(); // showing total cart price.
   }

   getcartDetailsFromlocalStorage(){
     //here we geting all items or products from localstorage and saving them into a varible named cartdata.
     //also we calculating all items in localstorage to all total item in cart. and saving it into a varible cartSize
    this.cartdata = JSON.parse(localStorage.getItem("itemsjson"));
    this.cartSize = this.cartdata.length;
   }
   totalCartPriceUpdate(){
       //here we fetching every item price from cartdata using for loop. and making sum of all. also we moving this sum to totalCartPrice variable.
    //price is stored at this postion this.cartdata[i][3] in array
    for(let i=0; i < this.cartdata.length; i++){
      this.totalCartPrice = this.totalCartPrice + parseInt(this.cartdata[i][6]);
     }
    // console.log(this.totalCartPrice);
    // console.log(JSON.parse(localStorage.getItem("itemsjson")));
   }
   setFormState():void{
   // this example used reactiveForm , so i need to set FormState.
    this.productForm = this.formbuilder.group({
    productid:[''],
    productimageurl:[''],
    productname:['', [Validators.required]],
    price:['', [Validators.required]],
    attributes:['', [Validators.required]],

     });
  }

  addtoCart(){
    //this method is called when Add product to cart button Clicked
   this.productName =  this.productForm.value["productname"]; // our product name from textbox
   this.productPrice =  this.productForm.value["price"]; // our product price from textbox
   this.productAttributes =  this.productForm.value["attributes"]; // our product attributes from textbox
   this.productquantity = this.defaultProductQuantity; // product quantity by default is 1 defaultProductQuantity = 1 declared above
   this.productid = this.productForm.value["productid"]; // product id from textbox
   this.productimageurl = this.productForm.value["productimageurl"]; // image url from textbox
   this.totalAmountOfEachProductByQuantity = this.productForm.value["price"]; // add price of 1 quantity 1st time, Which is price of product , we increase it later according to quantity.

   if (localStorage.getItem("itemsjson") == null) {
  //this if tag is call only one time (very first time), when localstorage is null,
  // here we adding all our product values in array and setting that array in localStorage
   this.itemjsonArray.push([this.productid, this.productimageurl, this.productName, this.productPrice, this.productAttributes, this.productquantity, this.totalAmountOfEachProductByQuantity]);
   localStorage.setItem("itemsjson", JSON.stringify(this.itemjsonArray));
   this.getcartDetailsFromlocalStorage(); // after setting all values again we called this function to get all data from local storage. to show refreshed data.
   this.totalCartPrice = 0; // then it is neccessary to set totalCartPrice varible value to 0, before calling totalCartPriceUpdate() function.
   this.totalCartPriceUpdate(); // then we called this totalCartPriceUpdate() for tatal cart value update.

} else {
    /*  this else part is called everytime when you add product to cart. except first time.
        here we first fetching all Products from local Storage in a varible itemjsonArraystr.
         then we parsing it and save it to  this.itemjsonArray (we alredy declared this array type varible in top above)
   */
    let itemjsonArraystr = localStorage.getItem("itemsjson");
    this.itemjsonArray = JSON.parse(itemjsonArraystr);
    /* now itemjsonArray have all products stored in local storage.
      here we push new product in itemjsonArray
      when we getting from local storage we getting data in same order we setting it.
      for ex. data stored in localstorage like this
      0 and 1 is index of products. index automatically created in localstorage.
      index        0               1                2                   3
      0      {'productName', 'productPrice', 'productAttributes', 'productquantity'}
      1      {'productName', 'productPrice', 'productAttributes', 'productquantity'}
      and the index of 'productquantity' is 3 for getting this productquantity,
      we need to write like this [0][3] or [1][3]
      so same order is required to fetching items. that we using to adding product details below
   */
    this.itemjsonArray.push([this.productid, this.productimageurl ,this.productName, this.productPrice, this.productAttributes, this.productquantity, this.totalAmountOfEachProductByQuantity ]);
    // after pushing new item itemjsonArray is updated with one more Product and we again set itemjsonArray to local Storage
    localStorage.setItem("itemsjson", JSON.stringify(this.itemjsonArray));
    // here we called our function getting all data from local storage. we already made this function above.
    this.getcartDetailsFromlocalStorage(); // after setting all values again we called this function to get all data from local storage. to show refreshed data.
    this.totalCartPrice = 0; // then it is neccessary to set totalCartPrice varible value to 0, before calling totalCartPriceUpdate() function.
    this.totalCartPriceUpdate(); // then we called this totalCartPriceUpdate() for tatal cart value update.
}

}
removeCartitem(i){
  //console.log(i);
  //remving cart item or value from array
 // console.log(this.cartdata);
 // here we removing item from cardata based on index coming from button click in i
  this.cartdata.splice(i,1);  // spice method is used to remove and replace a text.
  let newCartData =this.cartdata; // after removing we setting new cart data to newCartData varible
    // again setting newCartData varible in localstorage
  localStorage.setItem("itemsjson", JSON.stringify(newCartData));
  this.getcartDetailsFromlocalStorage(); // after setting all values again we called this function to get all data from local storage. to show refreshed data.
  this.totalCartPrice = 0; // then it is neccessary to set totalCartPrice varible value to 0, before calling totalCartPriceUpdate() function.
  this.totalCartPriceUpdate(); // then we called this totalCartPriceUpdate() for tatal cart value update.

}

cartQuantityUpdated(i, cartValue){ //cartValue is quantity in textbox in html
  this.quantityUpdate = this.cartdata[i]; // this i is index of local storage data
  //console.log(this.quantityUpdate);   // here we getting cartdata based on index coming from i parameter
  let newCartValue = parseInt(cartValue) + 1; // here newCartValue is cart value(quantity) coming from html side + 1
  this.quantityUpdate.splice(5, 1, newCartValue); // here in splice method 5 is index of data getting from quantityUpdate for ex quantityUpdate[5], it means change value on quantityUpdate[5th index]

  let newProductTotalValue = this.cartdata[i][3] * newCartValue; // we we multiplying quantity(this.cartdata[i][3]) to price(newCartValue) and saving value to newProductTotalValue varible
  this.quantityUpdate.splice(6,1, newProductTotalValue); // here we set newProductTotalValue varible to 6 index of quantityUpdate[6].
  //console.log(newProductTotalValue);
  let newCartData =this.cartdata;
  localStorage.setItem("itemsjson", JSON.stringify(newCartData));
  this.getcartDetailsFromlocalStorage(); // after setting all values again we called this function to get all data from local storage. to show refreshed data.
  this.totalCartPrice = 0; // then it is neccessary to set totalCartPrice varible value to 0, before calling totalCartPriceUpdate() function.
  this.totalCartPriceUpdate(); // then we called this totalCartPriceUpdate() for tatal cart value update.

 // console.log(this.cartdata);
 // console.log(cartValue);
}

cartQuantityUpdatedRemove(i, cartValue){
  if(cartValue<= 1){
    alert("Not Allowed, Qty. Must Be Atleast 1 Or Remove this Item From Cart");
  }else{
  this.quantityUpdate = this.cartdata[i]; // this i is index of local storage data
  //console.log(this.quantityUpdate);   // here we getting cartdata based on index coming from i parameter
  let newCartValue = parseInt(cartValue) - 1; // here newCartValue is cart value(quantity) coming from html side - 1
  this.quantityUpdate.splice(5, 1, newCartValue); // here in splice method 5 is index of data getting from quantityUpdate for ex quantityUpdate[5], it means change value on quantityUpdate[5th index]
  let newCartData =this.cartdata;

  let newProductTotalValue = this.cartdata[i][3] * newCartValue; // we we multiplying quantity(this.cartdata[i][3]) to price(newCartValue) and saving value to newProductTotalValue varible
  this.quantityUpdate.splice(6,1, newProductTotalValue); // here we set newProductTotalValue varible to 6 index of quantityUpdate[6].
  console.log(newProductTotalValue);

  localStorage.setItem("itemsjson", JSON.stringify(newCartData));
  this.getcartDetailsFromlocalStorage(); // after setting all values again we called this function to get all data from local storage. to show refreshed data.
  this.totalCartPrice = 0; // then it is neccessary to set totalCartPrice varible value to 0, before calling totalCartPriceUpdate() function.
  this.totalCartPriceUpdate(); // then we called this totalCartPriceUpdate() for tatal cart value update.
 // console.log(this.cartdata);
 // console.log(cartValue);
  }
}
checkOut(){
  console.log(this.cartdata);
  // getting product details from localStorage for checkout // we need to save this data to our database for temporary.
  // after successful checkout or purchase we need to remove this item from cart.
  for(let i=0;i<this.cartdata.length;i++){
      console.log(this.cartdata[i]);
      // console.log("Product Details For Index " + i);
      // for(let k=0;k<this.cartdata[i].length; k++){
      //   console.log(this.cartdata[i][k]);

      // }
   //  alert("Details of Product" + i + " " + this.cartdata[i]);
  }
}
buyNow(i){
 console.log(this.cartdata[i]);
}
}
