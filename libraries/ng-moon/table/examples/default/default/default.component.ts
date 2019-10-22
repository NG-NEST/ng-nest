import { Component, OnInit } from "@angular/core";
import { NmTableAction, NmTableColumn } from "ng-moon/table";
import * as _ from "lodash";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent {
  actions: NmTableAction[] = [
    { nmLabel: "播放全部", nmIcon: "fto-play" },
    { nmLabel: "下载", nmIcon: "fto-download" },
    { nmLabel: "批量操作", nmIcon: "fto-list" },
    {
      nmIcon: "fto-menu",
      nmTitle: "列表视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "fto-user",
      nmTitle: "歌手视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "fto-disc",
      nmTitle: "专辑视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "fto-play",
      nmTitle: "播放",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "fto-plus-square",
      nmTitle: "添加到",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "fto-download",
      nmTitle: "下载",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "fto-more-vertical",
      nmTitle: "更多操作",
      nmActionLayoutType: "row-icon"
    }
  ];
  columns: NmTableColumn[] = [
    { nmKey: "song", nmLabel: "歌曲", nmFlex: 2 },
    { nmKey: "auth", nmLabel: "作者", nmFlex: 1 },
    { nmKey: "album", nmLabel: "专辑", nmFlex: 1 }
  ];
  list = Array.from({ length: 115 }).map((x, i) => {
    return {
      song: `${i + 1} Free Loop 福特轿车广告曲`,
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
