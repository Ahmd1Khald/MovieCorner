import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // عشان أقدر أجيب الـ id اللي جاي من الـ URL
import { MovieService } from '../../core/services/movie-service'; // السيرفز اللي فيها كل شغل الأفلام
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true, // الكومبوننت دي مستقلة (standalone component)
  imports: [CommonModule ,RouterModule], // محتاج أستورد دول عشان أشتغل براحتى في الـ HTML
  templateUrl: './movie-details.html', // ملف الـ HTML الخاص بالتفاصيل
  styleUrls: ['./movie-details.css'] // التنسيقات بتاعت صفحة التفاصيل
})
export class MovieDetailsComponent implements OnInit {
  movie: any; // هنا هخزن بيانات الفيلم اللي جاي من الـ API
  isLoading: boolean = true; // دي عشان أتحكم في عرض لودر أثناء جلب البيانات

  constructor(
    private route: ActivatedRoute, // بستخدمه عشان أقرأ الـ id من الـ URL
    private movieService: MovieService // ده السيرفز اللي هجيب منه بيانات الفيلم
  ) {}

  ngOnInit(): void {
    // أول ما الكمبوننت تشتغل، بقرأ الـ id من الـ URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Movie ID from route:', id); // بس بطبع الـ id في الكونسول للتأكيد

    // بنادي الدالة اللي بتجيب تفاصيل الفيلم من السيرفز
    this.movieService.getMovieDetails(id).subscribe({
      next: (data) => {
        console.log('Movie details from API:', data); // بطبع البيانات في الكونسول أشوفها جاية صح ولا لأ
        this.movie = data; // بخزن البيانات في المتغير اللي فوق
        this.isLoading = false; // بقفل اللودر خلاص البيانات وصلت
      },
      error: (err) => {
        console.error('Error fetching movie details:', err); // لو حصل أي خطأ بطبعه عشان أعرف إيه اللي حصل
        this.isLoading = false; // بقفل اللودر حتى لو في خطأ
      }
    });
  }
}
