import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MdcSwitch, MdcSwitchModule } from '@angular-mdc/web';

describe('MdcSwitch', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcSwitchModule, FormsModule, ReactiveFormsModule],
      declarations: [
        SingleSwitch,
        SwitchWithFormDirectives,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let switchDebugElement: DebugElement;
    let switchNativeElement: HTMLElement;
    let switchInstance: MdcSwitch;
    let testComponent: SingleSwitch;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SingleSwitch);
      fixture.detectChanges();

      switchDebugElement = fixture.debugElement.query(By.directive(MdcSwitch));
      switchNativeElement = switchDebugElement.nativeElement;
      switchInstance = switchDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
      inputElement = switchInstance.inputEl.nativeElement;
    });

    it('#should change native element checked when check programmatically', () => {
      expect(inputElement.checked).toBe(false);

      switchInstance.checked = true;
      fixture.detectChanges();

      expect(inputElement.checked).toBe(true);
    });

    it('#should correctly update the checked property', () => {
      expect(switchInstance.checked).toBeFalsy();

      testComponent.slideChecked = true;
      fixture.detectChanges();

      expect(inputElement.checked).toBeTruthy();
    });

    it('#should add and remove disabled state', () => {
      expect(switchInstance.disabled).toBe(false);
      expect(inputElement.tabIndex).toBe(0);
      fixture.detectChanges();

      switchInstance.setDisabled(true);
      fixture.detectChanges();
      expect(inputElement.disabled).toBe(true);
    });

    it('#should not toggle `checked` state upon interation while disabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      inputElement.click();
      expect(switchInstance.checked).toBe(false);
      expect(switchInstance.isChecked()).toBe(false);
      expect(switchInstance.isDisabled()).toBe(true);
    });

    it('#should preserve the user-provided id', () => {
      expect(switchNativeElement.id).toBe('simple-switch');
      expect(inputElement.id).toBe('simple-switch-input');
    });

    it('#should generate a unique id for the switch input if no id is set', () => {
      testComponent.switchId = null;
      fixture.detectChanges();

      expect(switchInstance.inputId).toMatch(/mdc-switch-\d+/);
      expect(inputElement.id).toBe(switchInstance.inputId);
    });

    it('#should focus on underlying input element when focus() is called', () => {
      expect(document.activeElement).not.toBe(inputElement);

      switchInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(inputElement);
    });

    it('#should forward the tabIndex to the underlying input', () => {
      fixture.detectChanges();

      expect(inputElement.tabIndex).toBe(0);

      testComponent.slideTabindex = 4;
      fixture.detectChanges();

      expect(inputElement.tabIndex).toBe(4);
    });

    describe('with ngModel', () => {
      let switchDebugElement: DebugElement;
      let switchNativeElement: HTMLElement;
      let switchInstance: MdcSwitch;
      let inputElement: HTMLInputElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(SwitchWithFormDirectives);
        fixture.detectChanges();

        switchDebugElement = fixture.debugElement.query(By.directive(MdcSwitch));
        switchNativeElement = switchDebugElement.nativeElement;
        switchInstance = switchDebugElement.componentInstance;
        inputElement = <HTMLInputElement>switchNativeElement.querySelector('input');
      });

      it('#should be in pristine, untouched, and valid states initially', fakeAsync(() => {
        flushMicrotasks();

        let switchElement = fixture.debugElement.query(By.directive(MdcSwitch));
        let ngModel = switchElement.injector.get<NgModel>(NgModel);

        expect(ngModel.valid).toBe(true);
        expect(ngModel.pristine).toBe(true);
        expect(ngModel.touched).toBe(false);

        // TODO(trimox): test that `touched` and `pristine` state are modified appropriately.
        // This is currently blocked on issues with async() and fakeAsync().
      }));

      it('#should toggle checked state on click', () => {
        expect(switchInstance.checked).toBe(false);

        inputElement.click();
        fixture.detectChanges();

        expect(switchInstance.checked).toBe(true);

        inputElement.click();
        fixture.detectChanges();

        expect(switchInstance.checked).toBe(false);
      });
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <mdc-switch
      [id]="switchId"
      (click)="onSlideClick($event)"
      [checked]="slideChecked"
      [tabIndex]="slideTabindex"
      [disabled]="isDisabled">
    </mdc-switch>
  `,
})
class SingleSwitch {
  switchId: string | null = 'simple-switch';
  isDisabled: boolean = false;
  slideChecked: boolean = false;
  slideTabindex: number;
  switchValue: string = 'single_switch';

  onSlideClick: (event?: Event) => void = () => { };
}

/** Simple component for testing with ngModel in a form. */
@Component({
  template: `
    <form>
      <mdc-switch name="cb" [(ngModel)]="isGood">Be good</mdc-switch>
    </form>
  `,
})
class SwitchWithFormDirectives {
  isGood: boolean = false;
}
