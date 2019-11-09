import { Component, OnInit } from "@angular/core";
import { NuTableAction, NuTableColumn } from "@ng-nest/ui/table";
import * as _ from "lodash";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent {
  actions: NuTableAction[] = [
    { nuLabel: "播放全部", nuIcon: "fto-play" },
    { nuLabel: "下载", nuIcon: "fto-download" },
    { nuLabel: "批量操作", nuIcon: "fto-list" },
    {
      nuIcon: "fto-menu",
      nuTitle: "列表视图",
      nuActionLayoutType: "top-right-icon"
    },
    {
      nuIcon: "fto-user",
      nuTitle: "歌手视图",
      nuActionLayoutType: "top-right-icon"
    },
    {
      nuIcon: "fto-disc",
      nuTitle: "专辑视图",
      nuActionLayoutType: "top-right-icon"
    },
    {
      nuIcon: "fto-play",
      nuTitle: "播放",
      nuActionLayoutType: "row-icon"
    },
    {
      nuIcon: "fto-plus-square",
      nuTitle: "添加到",
      nuActionLayoutType: "row-icon"
    },
    {
      nuIcon: "fto-download",
      nuTitle: "下载",
      nuActionLayoutType: "row-icon"
    },
    {
      nuIcon: "fto-more-vertical",
      nuTitle: "更多操作",
      nuActionLayoutType: "row-icon"
    }
  ];
  columns: NuTableColumn[] = [
    { nuKey: "song", nuLabel: "歌曲", nuFlex: 2 },
    { nuKey: "auth", nuLabel: "作者", nuFlex: 1 },
    { nuKey: "album", nuLabel: "专辑", nuFlex: 1 }
  ];
  list = Array.from({ length: 115 }).map((x, i) => {
    return {
      song: i + 1 + `Free Loop 福特轿车广告曲`,
      auth: "Daniel Powter",
      album: "Daniel Powter"
    };
  });
  chunks = _.chunk(this.list, 10);
  data = this.chunks[0];
  index = 1;
  size = 10;
  total = this.list.length;
  indexChange(index: number) {
    if (index <= this.chunks.length) {
      this.index = index;
      this.data = [...this.chunks[index - 1]];
    }
  }
}
