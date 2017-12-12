import React, { Component } from 'react'

class FrontPage extends Component {
    render () {
        return (
            <div>
                <h3>Metsämittari - käyttöohje</h3>
                <p>
                    Aloita käyttö klikkaamalla oikeassa yläkulmassa olevaa <strong>Valinnat</strong> painiketta. 
                    Valitse sitten haluamasi skenariot ja indikaattorit. Aloita valitsemalla aluetaso, alue ja skenaariokokoelma. 
                    Seuraavaksi voit valita skenaariot, joita haluat tarkastella. Voit valita yhden, tai useita skenaarioita. 
                    Valitse vielä haluamasi tarkastelujakso (ajankohta).
                </p>
                <p>
                    Skenaarioiden valinnan jälkeen, voit valita haluamasi indikaattorit. Voit valita useita indikaattoreita
                    eri kategorioista. Ohjelma näyttää indikaattoritietoja sitä mukaa kun valitset indikaattoreita. 
                    Voit myös poistaa valintoja, klikkaamalla valinna oikeassa reunassa olevaa rastia.
                </p>
                <p>
                    Voi valita indikaattrien esitysmuodon <strong>Kaaviolaji</strong> valikosta. Vaihtoehtoisia esitysmuotoja ovat:
                </p>
                    <ul>
                        <li>Polar-kaavio<br />
                            <em>x-akseli sijaitsee kaavion keskipisteessä, y-akseli ulkoreunalla</em>
                        </li>
                        <li>Perinteinen palkkikaavio</li>
                        <li>Taulukko- esitys</li>
                    </ul>

            </div>
        )
    }
}

export default FrontPage