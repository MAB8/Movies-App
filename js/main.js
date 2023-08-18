"use strict"

// bu yerda movies datasidan malum qismini projectni ogrlawtramslik u.n qirqib oldik
movies.splice(100)


// bu yerda datani icidani ozimizga qulay nom bn nomlab oldik
//              NORMALIZATION DATA
const allMovies = movies.map(ell => {
    return {
        'title': ell.title,
        'year': ell.year,
        'category': ell.categories,
        'id': ell.imdbId,
        'rating': ell.imdbRating,
        'rountime': `${Math.trunc(ell.rountime / 60)}h, ${ell.rountime % 60} m`,
        'lang': ell.language,
        'youtube': `https://www.youtube.com/embed/${ell.youtubeId}`,
        'summary': ell.summary,
        'hdpic': ell.smallThumbnail,
        'maxpic': ell.bigThumbnail

    }
})
// console.log(allMovies);
//              NORMALIZATION DATA END


//              RENDER ALL MOVIES 
function allMoviesRender() {
    allMovies.forEach((el) => {
        const card = createElement('div', 'card', `
        <div class="card">
        <img src="${el.hdpic}" class="card-top-img" alt="rasm">
        <div class="card-body">
            <h3 class="card-title">${el.title}</h3>
            <ul class="card-list list-unstyled">
                <li class="card-list-item"><strong>${el.year}</strong></li>
                <li class="card-list-item"><strong>${el.lang}</strong></li>
                <li class="card-list-item"><strong>${el.rating}</strong></li>
                <li class="card-list-item"><strong>${el.category}</strong></li>
            </ul>
            <div class="social d-flex">
                <a href="${el.youtube}" class="btn btn-danger">
                    Youtube
                </a>
                <button href="#" class="btn btn-primary"data-more=${el.id}>
                    Read more...
                </button>
                <button href="#" class="btn btn-warning" data-save=${el.id}>
                    Save
                </button>
            </div>
        </div>
     </div>`)
        $('.wrapper').appendChild(card)
    })
}


allMoviesRender()
//              RENDER ALL MOVIES END



//              DYNAMIC CATEGORY


function categoryMovies() {
    const removeDublicate = []
    allMovies.forEach((item) => {
        item.category.forEach((e) => {
            if (!removeDublicate.includes(e)) {
                removeDublicate.push(e)
            }
        })
    })

    removeDublicate.sort()
    removeDublicate.forEach((e) => {
        const option = createElement("option", "bg-light", e);
        option.setAttribute('value', e);
        $('#category').appendChild(option)
    })
}
categoryMovies()
//              DYNAMIC CATEGORY END


//                                                   search movies


const searchFilm = function (query, rating, category) {
    console.log(query, rating, category);
    return allMovies.filter((e) => {
        return e.title.match(query) && e.rating >= rating && e.category.includes(category)
    })
}

console.log(searchFilm());


$('#searchBtn').addEventListener('click', () => {
    $(".wrapper").innerHTML = `<span class="loader"></span>`
    let inputValue = $('#search').value.trim()
    let rating = $("#rating").value.trim()
    let category = $("#category").value.trim()

    const inputValueRegex = new RegExp(inputValue, "gi")

    let result = searchFilm(inputValueRegex, rating, category)
    console.log(result);
    setTimeout(() => {
        finderRender(result)

    }, 3000)
})

function finderRender(data = []) {
    $(".wrapper").innerHTML = ""

    console.log(data);
    if (data.length > 0) {
        $('.count').innerHTML=`<h2>${data.length} ta malumot borakan brat!</h2>`

        data.forEach((el) => {
            const card = createElement('div', 'card', `
    <div class="card">
    <img src="${el.hdpic}" class="card-top-img" alt="rasm">
    <div class="card-body">
        <h3 class="card-title">${el.title}</h3>
        <ul class="card-list list-unstyled">
            <li class="card-list-item"><strong>${el.year}</strong></li>
            <li class="card-list-item"><strong>${el.lang}</strong></li>
            <li class="card-list-item"><strong>${el.rating}</strong></li>
            <li class="card-list-item"><strong>${el.category}</strong></li>
        </ul>
        <div class="social d-flex">
            <a href="${el.youtube}" class="btn btn-danger">
                Youtube
            </a>
            <button href="#" class="btn btn-primary"data-more=${el.id}>
                Read more...
            </button>
            <button href="#" class="btn btn-warning" data-save=${el.id}>
                Save
            </button>
        </div>
    </div>
 </div>`)
            $('.wrapper').appendChild(card)

        })
    }
    else{
        $('.wrapper').innerHTML='malumot topilmadi brat'
    }

}