import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProcesoService {

    public procesos: Observable<any[]>;

    constructor(private db: AngularFireDatabase) {
        this.procesos = db.list('asistencia').valueChanges();
    }

    public getProcesos(): Observable<any[]> {
        return this.procesos;
    }

}
