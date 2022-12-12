import { ContaService } from '../conta.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private dados: any = {}
  
  constructor(private alertController: AlertController, private servico: ContaService) {}

  getConta1() {
    this.servico.getConta(this.dados.conta1).subscribe(response => {
      if (response.correntista) {
        this.dados.desc1 = response.correntista + " R$ " + response.saldo
      } else {
        this.limparDados1()
      }
    }, erros =>{
      this.limparDados1()
      this.mensagem(erros)
    })
  }

  getConta2() {
    this.servico.getConta(this.dados.conta2).subscribe(response => {
      if (response.correntista) {
        this.dados.desc2 = response.correntista + " R$ " + response.saldo
      } else {
        this.limparDados2()
      }
    }, erros =>{
      this.limparDados2()
      this.mensagem(erros)
    })
  }

  transferir() {
    this.servico.transferir(this.dados.conta1, this.dados.conta2, this.dados.valor).subscribe(response => {
      this.limpar()
      this.mensagem("Transferência feita com sucesso!")
    }, erros =>{
      this.mensagem(erros)
    })
  }

  // operações privadas

  private limpar() {
    this.dados = {'conta1': '', 'conta2': '', 'valor':'', "desc1":'', "desc2":''}
  }

  private limparDados1() {
    this.dados.conta1 = ''
    this.dados.desc1 = ''
  }

  private limparDados2() {
    this.dados.conta2 = ''
    this.dados.desc2 = ''
  }
  
  async mensagem(texto) {
    const alert = await this.alertController.create({
      header: 'Mensagem',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }
}
