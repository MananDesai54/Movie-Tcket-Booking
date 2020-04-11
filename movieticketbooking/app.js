let container,
    seats,
    count,
    total,
    movieSelect,
    ticketPrice;

container = document.querySelector('.container');
seats = document.querySelectorAll('.row .seat:not(.occupied)');
count = document.querySelector('#count');
total = document.querySelector('#total');

movieSelect = document.querySelector('#movie');
ticketPrice = +movieSelect.value;

window.addEventListener('load',()=>{
    populateUi();
})

function populateUi() {
    let selectedSeats = JSON.parse(localStorage.getItem('seats'));
    let occupiedSeats = JSON.parse(localStorage.getItem('occupied-seats'));
    let price = localStorage.getItem('price');
    let movie = movieSelect[+localStorage.getItem('movie')];
    
    if(selectedSeats !== null && selectedSeats.length > 0) {
        selectedSeats.forEach(seat=>{
            [...seats][+seat].classList.add('selected');
        })
    }
    if(occupiedSeats !== null && occupiedSeats.length > 0) {
        occupiedSeats.forEach(seat=>{
            [...seats][+seat].classList.add('occupied');
        })
    }
    if(movie !== null ) {
        movieSelect = movie;
    }
    if(price !== null) {
        count.innerText = selectedSeats.length;
        total.innerText = +price*selectedSeats.length;
    }
}

function updateSelected() {
    let seletedSeats = document.querySelectorAll('.row .selected')
    
    let seatsIndex = [...seletedSeats].map(seat=>{
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('seats',JSON.stringify(seatsIndex))

    let countSelected = seletedSeats.length;

    count.innerText = countSelected;
    total.innerText = countSelected * ticketPrice;
}

container.addEventListener('click',(event)=>{
    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
    }
    updateSelected();
})

document.querySelector('button').addEventListener('click',()=>{
    let selectedSeats = document.querySelectorAll('.row .selected')
    selectedSeats.forEach(seat=>{
        seat.classList.remove('selected');
        seat.classList.add('occupied');
    })
    let occupied = document.querySelectorAll('.row .occupied')
    let seatsIndex = [...occupied].map(seat=>{
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('occupied-seats',JSON.stringify(seatsIndex))
    localStorage.setItem('seats',JSON.stringify([]));
})

movieSelect.addEventListener('input',(e)=>{
    ticketPrice = +e.target.value;
    localStorage.setItem('movie',e.target.selectedIndex);
    localStorage.setItem('price',e.target.value);
    updateSelected();
})