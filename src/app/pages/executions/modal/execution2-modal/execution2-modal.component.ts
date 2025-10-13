import {
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core'
import { ModalController } from '@ionic/angular'
import { AccordeonChecklistComponent } from 'src/app/components/accordeon-checklist/accordeon-checklist.component'
import { CheckboxListComponent } from 'src/app/components/checkbox-list/checkbox-list.component'
import { IRobot, IExecution } from 'src/app/interfaces'
import { ExecutionService } from 'src/app/services/execution/execution.service'
import { Execution2Service } from 'src/app/services/execution/execution2.service'
@Component({
    selector: 'app-execution2-modal',
    templateUrl: './execution2-modal.component.html',
    styleUrls: ['./execution2-modal.component.scss'],
})
export class Execution2ModalComponent implements OnInit {
    @Input() type: string = ''

    valueSearch: string = ''
    @ViewChildren(CheckboxListComponent)
    allCheckBoxList!: QueryList<CheckboxListComponent>

    idSelectedAccordion: string = ''
    robots: any[] = []
    loading: boolean = false
    resp: any

    constructor(
        private modalController: ModalController,
        private execution2Service: Execution2Service
    ) {}
    ngOnInit(): void {
        throw new Error('Method not implemented.')
    }
    options: any[] = []
  
    cancel() {
        this.modalController.dismiss()
    }
  
    generate() {
        this.execution2Service.generateReport('gt').subscribe(r => this.resp = r);
    }
  }
  