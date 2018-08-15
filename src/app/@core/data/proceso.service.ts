import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProcesoService {

    public procesos: Observable<any[]>;

    constructor(private db: AngularFireDatabase) {

    }

    public getProcesos(): Observable<any[]> {
        this.procesos = this.db.list('asistencia').valueChanges();
        return this.procesos;
    }

}
