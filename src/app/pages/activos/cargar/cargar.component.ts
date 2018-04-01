import { Component, OnInit } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'ngx-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.scss'],
})
export class CargarComponent implements OnInit {
  documento = {
    tipo_formulario: 'basic',
    titulo: 'Datos básicos',
    alertas: true,
    btn: 'Subir',
    modelo: 'Doc',
    campos: [
      {
        claseGrid: 'col-12',
        etiqueta: 'file',
        nombre: 'Activo',
        label: '* Activos',
        placeholder: 'Por favor suba el archivo',
        requerido: true,
        tipo: 'text',
        formatos: 'csv',
        tamanoMaximo: 2,
      }],
  }

  subirActivo(data) {
    console.info(data);
    const file = data.files[0].file;
    console.info(file);
    const bucket = new S3({
      accessKeyId: 'AKIAJYND4VASSBRZ7CQQ',
      secretAccessKey: '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',
      region: 'us-east-1',
    });
    const params = {
      Bucket: 'subida_cliente_s3',
      Key: file.name,
      Body: file,
    };
    bucket.upload(params, function (error, res) {
    })
  }

  constructor() { }

  ngOnInit() {
  }

}
