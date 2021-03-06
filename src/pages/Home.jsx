import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from 'axios'
import { API_URL } from "../constants/Api"

export default class Home extends React.Component {

    // state untuk menampung productList
    state = {
        productList: [],
        filteredProductList: [],
        page: 1,
        maxPage: 0,
        itemPerPage: 4,
        searchProductName: "",
        searchCategory: ""
    }

    // fetchProducts = meminta data ke API dan menyimpan data pada state productList
    fetchProducts = () => {
        Axios.get(`${API_URL}/products`)
        .then(result => {
            this.setState({productList: result.data, maxPage: Math.ceil(result.data.length / this.state.itemPerPage), filteredProductList: result.data})
        })
        .catch(err => {
            alert("Terjadi kesalahan pada server!")
        })
    }

    // render setiap product yang ada di productList
    renderProduct = () => {
        const beginningIndex = (this.state.page - 1) * this.state.itemPerPage
        const currentData = this.state.filteredProductList.slice(beginningIndex, beginningIndex + this.state.itemPerPage)

        return currentData.map( val => {
            // productData sebagain props yang akan mengirim data ke component ProductCard
            return <ProductCard productData={val} />
        })
    }

    // handler untuk pagination
    nextPageHandler = () => {
        if (this.state.page < this.state.maxPage){
            this.setState({ page: this.state.page + 1})
        }
    }
    prevPageHandler = () => {
        if (this.state.page > 1){
            this.setState({ page: this.state.page - 1 })
        }
    }

    // method untuk searching product
    searchInputHandler = (event) => {
        // name : property name pada element
        const name = event.target.name
        // value : value yang di input oleh user
        const value = event.target.value

        this.setState({ [name]: value })
    }

    // method untuk menampilkan barang sesuai search bar
    searchBtnHandler = () => {
        const filteredProductList = this.state.productList.filter( val => {
            return val.productName.toLowerCase().includes(this.state.searchProductName.toLowerCase()) && val.category.includes(this.state.searchCategory)
        })
        this.setState({ 
            filteredProductList, 
            maxPage: Math.ceil(filteredProductList.length / this.state.itemPerPage), 
            page: 1 
        })

    }

     // memanggil fetchProducts dari awal program jalan
    componentDidMount() {
        this.fetchProducts();
    }

    render () {
        return (
            <div className="container mt-5">
        <div className="row">
            <div className="col-3">
                <div className="card">
                <div className="card-header">
                    <strong>Filter Products</strong>
                </div>
                <div className="card-body">
                    <label htmlFor="searchProductName">Product Name</label>
                    <input
                    onChange={this.searchInputHandler}
                    name="searchProductName"
                    type="text"
                    className="form-control mb-3"
                    />
                    <label htmlFor="searchCategory">Product Category</label>
                    <select onChange={this.searchInputHandler} name="searchCategory" className="form-control">
                    <option value="">All Items</option>
                    <option value="electric">Electric Guitar</option>
                    <option value="acoustic">Acoustic Guitar</option>
                    <option value="accessories">Accessories</option>
                    </select>
                    <button onClick={this.searchBtnHandler} className="btn btn-primary mt-3">
                        Search
                    </button>
                </div>
                </div>
                <div className="card mt-4">
                <div className="card-header">
                    <strong>Sort Products</strong>
                </div>
                <div className="card-body">
                    <label htmlFor="searchCategory">Sort by</label>
                    <select name="searchCategory" className="form-control">
                    <option value="">Default</option>
                    <option value="">Lowest Price</option>
                    <option value="">Highest Price</option>
                    <option value="">A-Z</option>
                    <option value="">Z-A</option>
                    </select>
                </div>
                </div>
                <div className="mt-3">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    {/* button disabled menerima boolean yang ditentukan dari state yang kita miliki */}
                    <button disabled={this.state.page === 1} onClick={this.prevPageHandler} className="btn btn-dark">
                    {"<"}
                    </button>
                    <div className="text-center">Page { this.state.page } of { this.state.maxPage } </div>
                    <button disabled={this.state.page === this.state.maxPage} onClick={this.nextPageHandler} className="btn btn-dark">
                    {">"}
                    </button>
                </div>
                </div>
            </div>
            <div className="col-9">
                <div className="d-flex flex-wrap flex-row">
                {/* Render products here */}
                {this.renderProduct()}
                </div>
            </div>
            </div>
        </div>
        )
    }
}