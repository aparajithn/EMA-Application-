export class Question {

    private readonly _id: number;
    private readonly _type: string;
    private readonly _text: string;
    private readonly _lower_bound: number;
    private readonly _upper_bound: number;
    private readonly _lb_desc: string;
    private readonly _ub_desc: string;
    private _response: any;

    constructor(id: number,
                type: string,
                text: string,
                lower_bound: number,
                upper_bound: number,
                lb_desc: string,
                ub_desc: string) {
        this._id = id;
        this._type = type;
        this._text = text;
        this._lower_bound = lower_bound;
        this._upper_bound = upper_bound;
        this._lb_desc = lb_desc;
        this._ub_desc = ub_desc;
    }

    get id(): number {
        return this._id;
    }

    get type(): string {
        return this._type;
    }

    get text(): string {
        return this._text;
    }

    get lower_bound(): number {
        return this._lower_bound;
    }

    get upper_bound(): number {
        return this._upper_bound;
    }

    get lb_desc(): string {
        return this._lb_desc;
    }

    get ub_desc(): string {
        return this._ub_desc;
    }

    get response(): any {
        return this._response;
    }

    set response(value: any) {
        this._response = value;
    }
}