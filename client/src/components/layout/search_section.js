import React from 'react'

const Search_section = () => {
  return (
    <section className="hero_single version_2">
    <div className="wrapper">
        <div className="container">
            <h3>What would you learn?</h3>
            <p>Increase your expertise in business, technology and personal development</p>
            <form>
                <div id="custom-search-input">
                    <div className="input-group">
                        <input type="text" className="search-query" placeholder="Ex. Architecture, Specialization..."/>
                        <input type="submit" className="btn_search" value="Search"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
</section>
  )
}

export default Search_section