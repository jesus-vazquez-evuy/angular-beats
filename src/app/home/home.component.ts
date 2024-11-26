import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItunesService } from '../shared/itunes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchKey: string = ''; // Controla el valor del campo de búsqueda
  featuredAlbums: Array<any> = []; // Lista de álbumes destacados

  constructor(private router: Router, private ituneService: ItunesService) {}

  ngOnInit() {
    const artists = [
      { artistId: 32940, albumName: 'Thriller' },
      { artistId: 412778295, albumName: 'Sweetener' },
      { artistId: 1419227, albumName: 'Dangerously in Love' },
      { artistId: 112018, albumName: 'Nevermind' },
      { artistId: 271256, albumName: 'Scorpion' },
      { artistId: 479756766, albumName: 'Starboy' },
      { artistId: 3174628, albumName: 'Legend – The Best Of Bob Marley & The Wailers' },
      { artistId: 320569549, albumName: 'Changes' },
      { artistId: 799597, albumName: 'To Be Loved' },
      { artistId: 278873078, albumName: '24K Magic' },
      { artistId: 5040714, albumName: 'Highway to Hell' },
      { artistId: 3296287, albumName: 'Bohemian Rhapsody (The Original Soundtrack)' },
    ];

    artists.forEach(artist => {
      this.ituneService.getAlbum(artist.artistId).subscribe(albums => {
        const album = albums.find(a => a.collectionName === artist.albumName);
        if (album) {
          this.featuredAlbums.push(album);
        } else {
          console.log(`El álbum "${artist.albumName}" no se encontró.`);
        }

        // Ajustar nombres de álbumes largos
        this.featuredAlbums = this.featuredAlbums.map(album => {
          if (album.collectionName === 'Legend – The Best Of Bob Marley & The Wailers') {
            album.collectionName = 'Legend';
          }
          if (album.collectionName === 'Bohemian Rhapsody (The Original Soundtrack)') {
            album.collectionName = 'Bohemian Rhapsody';
          }
          if (album.artistName === 'Bob Marley & The Wailers') {
            album.artistName = 'Bob Marley';
          }
          return album;
        });
      });
    });
  }

  search(value: string) {
    this.searchKey = value; // Actualiza el campo de búsqueda
  }

  navigateToAlbum(album: any) {
    const { artistId, collectionId, collectionName, artistName } = album;
    this.router.navigate([artistId, artistName, collectionId, collectionName]);
  }
}
