import { Component, OnInit } from "@angular/core";
import { XTableAction, XTableColumn } from "@ng-nest/ui/table";
import * as _ from "lodash";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent {
  actions: XTableAction[] = [
    { label: "播放全部", icon: "fto-play" },
    { label: "下载", icon: "fto-download" },
    { label: "批量操作", icon: "fto-list" },
    {
      icon: "fto-menu",
      title: "列表视图",
      actionLayoutType: "top-right-icon"
    },
    {
      icon: "fto-user",
      title: "歌手视图",
      actionLayoutType: "top-right-icon"
    },
    {
      icon: "fto-disc",
      title: "专辑视图",
      actionLayoutType: "top-right-icon"
    },
    {
      icon: "fto-play",
      title: "播放",
      actionLayoutType: "row-icon"
    },
    {
      icon: "fto-plus-square",
      title: "添加到",
      actionLayoutType: "row-icon"
    },
    {
      icon: "fto-download",
      title: "下载",
      actionLayoutType: "row-icon"
    },
    {
      icon: "fto-more-vertical",
      title: "更多操作",
      actionLayoutType: "row-icon"
    }
  ];
  columns: XTableColumn[] = [
    { key: "song", label: "歌曲", flex: 2 },
    { key: "auth", label: "作者", flex: 1 },
    { key: "album", label: "专辑", flex: 1 }
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
