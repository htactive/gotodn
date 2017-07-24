interface SweetAlertRequest {
  title: string,
  text: string,
  type?: SweetAlertTypeEnums,
  showCancelButton?: boolean,
  confirmButtonClass?: string,
  confirmButtonText?: string,
  closeOnConfirm?: boolean
}

export enum SweetAlertResultEnums{
  Confirm = 1,
  Cancel = 2,

}

export enum SweetAlertTypeEnums{
  Success = 1,
  Warning = 2,
  Error = 3
}

export class SweetAlerts {
  static show(request: SweetAlertRequest): Promise<SweetAlertResultEnums> {
    return new Promise((action: (r: SweetAlertResultEnums) => void) => {
      let type = "";
      switch (request.type){
        case SweetAlertTypeEnums.Warning:
          type= "warning";
          break;
        case SweetAlertTypeEnums.Success:
          type= "success";
          break;
        case SweetAlertTypeEnums.Error:
          type= "error";
          break;
        default:
          type = "success";
      }
      window['swal']({
          title: request.title,
          text: request.text,
          type: type,
          showCancelButton: !!request.showCancelButton,
          confirmButtonClass: request.confirmButtonClass || "btn-danger",
          confirmButtonText: request.confirmButtonText || "OK",
          closeOnConfirm: !!request.closeOnConfirm || !request.showCancelButton
        },
        (isConfirm) => {
          action(isConfirm ? SweetAlertResultEnums.Confirm : SweetAlertResultEnums.Cancel);
        }
      );
    });
  }
}