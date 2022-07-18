import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../models/book.model";
import {BookService} from "../../services/book.service";

declare var $: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent{

  // book: Book = new Book();  book nesnesi için form oluşturulcak
  errorMessage: string = "";


  @Input() book: Book = new Book(); // edit - ebeveynden cocuga bilgi gonderimi
  @Output() save = new EventEmitter<any>(); // kitsp başarıyla oluşturulduktan sonra ebeveyne event göndericem
  constructor(private bookService:BookService) { }

  saveBook(){
    this.bookService.saveBook(this.book).subscribe(data=>{
      this.save.emit(data);
      $('#bookModal').modal('hide');
    }, err=>{
      this.errorMessage = "Unexpected error occurred.";
      console.log(err);
    })
  }

  showBookModal() {
    $('#bookModal').modal('show');
  }

}
