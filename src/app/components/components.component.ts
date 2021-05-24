import { Component, OnInit, Renderer2 } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { NgForm } from "@angular/forms";
import "../../assets/smtp.js";
declare let Email: any;
@Component({
  selector: "app-components",
  templateUrl: "./components.component.html",
  styles: [
    `
      ngb-progressbar {
        margin-top: 5rem;
      }
    `,
  ],
})
export class ComponentsComponent implements OnInit {
  page = 4;
  page1 = 5;
  focus;
  focus1;
  focus2;
  date: { year: number; month: number };
  model: NgbDateStruct;
  showMessageUser: boolean = false;

  constructor(private renderer: Renderer2) {}
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  ngOnInit() {
    let input_group_focus = document.getElementsByClassName("form-control");
    let input_group = document.getElementsByClassName("input-group");
    for (let i = 0; i < input_group.length; i++) {
      input_group[i].children[0].addEventListener("focus", function () {
        input_group[i].classList.add("input-group-focus");
      });
      input_group[i].children[0].addEventListener("blur", function () {
        input_group[i].classList.remove("input-group-focus");
      });
    }
  }

  onSubmit(form: NgForm) {
    console.log({ form });
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "mkevin755@gmail.com",
      Password: "600C94D6469EB65647806C7D557E5B76470A",
      To: `${form.value.userEmail}`,
      From: "mkevin755@gmail.com",
      Subject: "Formulario de contacto",
      Body:
        "<p>Hemos recibido su mensaje.</p><br/>" +
        "<p>Pronto alguno de nuestros colaboradores se prondrá en contacto con usted.</p>" +
        `<p>Su mensaje: ${form.value.userMessage}</p>` +
        "<p>Saludos cordiales, TM3</p>",
    }).then((message) => {
      this.showMessageUser = true;
      setTimeout(() => {
        this.showMessageUser = false;
        form.resetForm();
      }, 3000);
      console.log(message);
    });
  }
}
