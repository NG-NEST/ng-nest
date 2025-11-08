import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed } from '@angular/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XFileCardPrefix, XFileCardProperty } from './attachments.property';
import { XFileSize, XIsEmpty, XIsString } from '@ng-nest/ui/core';
import { NgClass } from '@angular/common';
import { XImageComponent } from '@ng-nest/ui/image';

const defaultIcon: { [key: string]: string } = {
  xlsx: 'adf-file-excel',
  xls: 'adf-file-excel',
  docx: 'adf-file-word',
  doc: 'adf-file-word',
  ppt: 'adf-file-ppt',
  pptx: 'adf-file-ppt',
  pdf: 'adf-file-pdf',
  zip: 'adf-file-zip',
  rar: 'adf-file-zip',
  '7z': 'adf-file-zip',
  png: 'adf-file-image',
  jpg: 'adf-file-image',
  jpeg: 'adf-file-image',
  gif: 'adf-file-image',
  bmp: 'adf-file-image',
  md: 'adf-file-markdown',
  txt: 'adf-file-text',
  mp4: 'adf-video-camera',
  avi: 'adf-video-camera',
  mkv: 'adf-video-camera',
  mov: 'adf-video-camera',
  mp3: 'adf-audio',
  wav: 'adf-audio',
  flac: 'adf-audio',
  default: 'adf-file'
};

const defaultIconColors: { [key: string]: string } = {
  'adf-file-excel': '#217346',
  'adf-file-word': '#2b579a',
  'adf-file-ppt': '#d24726',
  'adf-file-pdf': '#dc3545',
  'adf-file-zip': '#6c757d',
  'adf-file-image': '#ffc107',
  'adf-file-markdown': '#000000',
  'adf-file-text': '#6c757d',
  'adf-video-camera': '#ff6b6b',
  'adf-audio': '#007bff',
  'adf-file': '#6c757d'
};

@Component({
  selector: 'x-file-card',
  templateUrl: './file-card.component.html',
  styleUrl: './file-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [XOutletDirective, XImageComponent, XIconComponent, NgClass]
})
export class XFileCardComponent extends XFileCardProperty {
  iconString = computed(() => {
    if (XIsString(this.icon())) {
      return this.icon() as string;
    } else {
      return '';
    }
  });
  descriptionString = computed(() => {
    if (XIsString(this.description())) {
      return this.description() as string;
    } else {
      return '';
    }
  });
  sizeTransform = computed(() => {
    if (this.size() && this.size() !== 0) {
      return XFileSize(this.size(), { precision: 0 });
    } else {
      return '';
    }
  });
  nameSubfix = computed(() => {
    const name = this.name() as string;
    const index = name.lastIndexOf('.');
    return index > -1 ? name.substring(index + 1).toLowerCase() : '';
  });
  defaultIcon = computed(() => {
    if (Object.keys(defaultIcon).includes(this.nameSubfix())) {
      return defaultIcon[this.nameSubfix()];
    } else {
      return defaultIcon['default'];
    }
  });
  defaultColor = computed(() => {
    return defaultIconColors[this.defaultIcon()];
  });
  classMap = computed(() => ({
    [`${XFileCardPrefix}-${this.variant()}`]: !XIsEmpty(this.variant())
  }));
  isImage = computed(() => {
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
    return imageExtensions.includes(this.nameSubfix().toLowerCase());
  });
}
