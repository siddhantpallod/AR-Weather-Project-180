let coordinates = {}

$(document).ready(function () {
    getCoordinates()
    getWeather()
})

function getCoordinates(){
    let searchParams = new URLSearchParams(window.location.href)
    if(searchParams.has('source') && searchParams.has('destination')){
        let source = searchParams.get('source')
        let destination = searchParams.get('destination')
        coordinates.source_lat = source.split(';')[0]
        coordinates.source_lon = source.split(';')[1]
        coordinates.destination_lat = destination.split(';')[0]
        coordinates.destination_lon = destination.split(';')[1]
    }
    else{
        alert('Coordinates not selected')
        window.history.back();
    }
}

function getWeather(){
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_lat}&lon=${coordinates.destination_lon}&appid=b39a63bf6010e8d9db8c1da10312dbfd`,
        type: 'get',
        success: function(response){
            let name = response.name
            let weather = response.weather[0].main
            $('#scene-container').append(
                `
                <a-entity gps-entity-place="latitude: ${steps[i].maneuver.location[1]}; longitude: ${steps[i].maneuver.location[0]};">
                    <a-entity>
                        <a-text height="50" value="Weather forcast is ${weather} at ${name}"></a-text>
                    </a-entity>
                </a-entity>
                `
            )
        }
    })
}