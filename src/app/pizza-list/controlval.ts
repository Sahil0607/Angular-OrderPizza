export interface Controlval {
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    // setDisabledState(isDisabled: boolean)?: void;
}
