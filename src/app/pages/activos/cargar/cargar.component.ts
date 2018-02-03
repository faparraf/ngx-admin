import { Component, OnInit } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'ngx-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.scss'],
})
export class CargarComponent implements OnInit {
  fileEvent(fileInput: any) {
    const file = fileInput.target.files[0];
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
    bucket.upload(params, function(error, res){
    })

  }

  constructor() { }

  ngOnInit() {
  }

}
