export class ValidatorConstants{
    public static v_username = '^[0-9a-z\.\_\@]{5,45}$';
    public static v_password = '^(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,20}$';
    public static v_fullname = '^([a-z A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]){5,120}$';
    public static v_manv = '^([A-Za-z0-9]){1,10}$';
    public static v_email = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
    public static v_phone = '^([0-9]){9,15}$';
    public static v_mabn = '^([0-9]){8}$';
    public static v_namsinh = '^([1-9]){1}([0-9]){3}$';
    public static v_gio = '^([0-9]){2}\:([0-9]){2}$';

    public static ms_required = 'Không được để trống';
    public static ms_pattern = 'Không hợp lệ';
    public static ms_textlength = 'Độ dài chuỗi không hợp lệ';
    public static ms_mabn = '8 ký tự (0->9)';
    public static ms_gio = 'định dạng 00:00';
    public static ms_ngay= 'định dạng dd/mm/yyyy';
}