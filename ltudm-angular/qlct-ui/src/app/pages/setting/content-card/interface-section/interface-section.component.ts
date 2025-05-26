import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FontOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-interface-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interface-section.component.html',
  styleUrls: ['./interface-section.component.css'],
})
export class InterfaceSectionComponent implements OnInit {
  // Options
  backgroundOptions = ['#f6f6fc', '#ffffff', '#e0e0e0', '#f0f8ff', '#f5f5dc'];
  fontOptions: FontOption[] = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
    { name: 'Georgia', value: 'Georgia, serif' },
  ];

  // Default values
  private readonly defaultBackground = '#f6f6fc';
  private readonly defaultFont = 'Inter, sans-serif';

  // Selected values
  selectedBackground: string = this.defaultBackground;
  selectedFont: string = this.defaultFont;
  isChangingFont: boolean = false;
  errorMessage: string = '';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadPreferences();
    this.applyGlobalStyles();
  }

  // Helper function to get font name for display
  getFontName(fontValue: string): string {
    const font = this.fontOptions.find((f) => f.value === fontValue);
    return font ? font.name : 'Inter';
  }

  setBackground(color: string): void {
    this.selectedBackground = color;
    this.applyGlobalStyles();
    this.savePreferences();
  }

  setFont(fontValue: string): void {
    this.selectedFont = fontValue;
    this.applyGlobalStyles();
    this.isChangingFont = false;
    this.savePreferences();
  }

  toggleFontChange(): void {
    this.isChangingFont = !this.isChangingFont;
  }

  resetToDefault(): void {
    this.selectedBackground = this.defaultBackground;
    this.selectedFont = this.defaultFont;
    this.isChangingFont = false;
    this.errorMessage = '';
    this.applyGlobalStyles();
    localStorage.removeItem('appInterfaceSettings');
    console.log('Reset to default settings:', {
      background: this.selectedBackground,
      font: this.selectedFont,
    });
  }

  private applyGlobalStyles(): void {
    try {
      // Apply CSS variables to :root
      this.renderer.setStyle(document.documentElement, '--app-background', this.selectedBackground);
      this.renderer.setStyle(document.documentElement, '--app-font', this.selectedFont);

      // Force immediate application
      document.documentElement.style.setProperty('--app-background', this.selectedBackground);
      document.documentElement.style.setProperty('--app-font', this.selectedFont);

      // Debug current styles
      console.log('Applied global styles:', {
        background: this.selectedBackground,
        font: this.selectedFont,
        computedBackground: getComputedStyle(document.documentElement).getPropertyValue('--app-background'),
        computedFont: getComputedStyle(document.documentElement).getPropertyValue('--app-font'),
      });
    } catch (error) {
      this.errorMessage = 'Lỗi khi áp dụng giao diện. Vui lòng thử lại.';
      console.error('Error applying global styles:', error);
    }
  }

  private savePreferences(): void {
    try {
      const settings = {
        background: this.selectedBackground,
        font: this.selectedFont,
      };
      localStorage.setItem('appInterfaceSettings', JSON.stringify(settings));
      console.log('Saved preferences:', settings);
    } catch (error) {
      this.errorMessage = 'Lỗi khi lưu cài đặt giao diện.';
      console.error('Error saving preferences:', error);
    }
  }

  private loadPreferences(): void {
    try {
      const saved = localStorage.getItem('appInterfaceSettings');
      if (saved) {
        const settings = JSON.parse(saved);
        this.selectedBackground = settings.background && this.backgroundOptions.includes(settings.background)
          ? settings.background
          : this.defaultBackground;
        this.selectedFont = settings.font && this.fontOptions.some((f) => f.value === settings.font)
          ? settings.font
          : this.defaultFont;
        console.log('Loaded preferences:', settings);
      }
    } catch (error) {
      this.errorMessage = 'Lỗi khi tải cài đặt giao diện. Sử dụng mặc định.';
      console.error('Error loading preferences:', error);
      this.selectedBackground = this.defaultBackground;
      this.selectedFont = this.defaultFont;
    }
  }

  isSelected(option: string, current: string): boolean {
    return option === current;
  }
}