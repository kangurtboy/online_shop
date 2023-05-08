import { makeAutoObservable } from "mobx";

class CatalogStore {
    _categories = [];
    _brands = [];
    _mehanizms = [];
    _genders = [];
    _shapes = [];
    _materials = [];
    _glasses = [];
    _straps = [];
    _powers = [];
    _waters = [];
    _products = [];
    _category = null;
    _brand = null;
    _mehanizm = null;
    _gender = null;
    _shape = null;
    _material = null;
    _glass = null;
    _strap = null;
    _power = null;
    _water = null;
    _page = 1;
    _count = 0;
    _limit = 16;
    _searchTerm = "";
	_minPrice = 0;
	_maxPrice = 0;

    constructor() {
        makeAutoObservable(this);
    }

    get categories() {
        return this._categories;
    }
    get brands() {
        return this._brands;
    }
    get mehanizms() {
        return this._mehanizms;
    }
    get genders() {
        return this._genders;
    }
    get shapes() {
        return this._shapes;
    }
    get materials() {
        return this._materials;
    }
    get glasses() {
        return this._glasses;
    }
    get straps() {
        return this._straps;
    }
    get powers() {
        return this._powers;
    }
    get waters() {
        return this._waters;
    }
    get products() {
        return this._products;
    }

    get category() {
        return this._category;
    }
    get brand() {
        return this._brand;
    }
    get mehanizm() {
        return this._mehanizm;
    }
    get gender() {
        return this._gender;
    }
    get shape() {
        return this._shape;
    }
    get material() {
        return this._material;
    }
    get glass() {
        return this._glass;
    }
    get strap() {
        return this._strap;
    }
    get power() {
        return this._power;
    }
    get water() {
        return this._water;
    }
    get page() {
        return this._page;
    }
    get count() {
        return this._count;
    }
    get limit() {
        return this._limit;
    }
    get pages() {
        return Math.ceil(this.count / this.limit);
    }
    get searchTerm() {
        return this._searchTerm;
    }

	get minPrice(){
		return this._minPrice;
	}
	get maxPrice(){
		return this._maxPrice;
	}

    set categories(categories) {
        this._categories = categories;
    }
    set brands(brands) {
        this._brands = brands;
    }
    set mehanizms(mehanizms) {
        this._mehanizms = mehanizms;
    }
    set genders(genders) {
        this._genders = genders;
    }
    set shapes(shapes) {
        this._shapes = shapes;
    }
    set materials(materials) {
        this._materials = materials;
    }
    set glasses(glasses) {
        this._glasses = glasses;
    }
    set straps(straps) {
        this._straps = straps;
    }
    set powers(powers) {
        this._powers = powers;
    }
    set waters(waters) {
        this._waters = waters;
    }
    set products(products) {
        this._products = products;
    }

    set category(id) {
        this.page = 1;
        this._category = id;
    }
    set brand(id) {
        this.page = 1;
        this._brand = id;
    }
    set mehanizm(id) {
        this.page = 1;
        this._mehanizm = id;
    }
    set gender(id) {
        this.page = 1;
        this._gender = id;
    }
    set shape(id) {
        this.page = 1;
        this._shape = id;
    }
    set material(id) {
        this.page = 1;
        this._material = id;
    }
    set glass(id) {
        this.page = 1;
        this._glass = id;
    }
    set strap(id) {
        this.page = 1;
        this._strap = id;
    }
    set power(id) {
        this.page = 1;
        this._power = id;
    }
    set water(id) {
        this.page = 1;
        this._water = id;
    }
    set page(page) {
        this._page = page;
    }
    set count(count) {
        this._count = count;
    }
    set limit(limit) {
        this._limit = limit;
    }
    set searchTerm(term) {
        this.page = 1;
        this._searchTerm = term;
    }

	set minPrice(price){
		this._minPrice = price;
	}
	set maxPrice(price){
		this._maxPrice = price;
	}
}

export default CatalogStore;