import { Component, signal } from '@angular/core';
import { XCommentComponent, XCommentNode } from '@ng-nest/ui/comment';
import { XAddHours, XAddMinutes } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XCommentComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  now = signal(new Date());
  src = signal('https://ngnest.com/img/logo/logo-144x144.png');
  content = signal(`The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know.`);
  data = signal<XCommentNode[]>([
    {
      id: '1',
      src: this.src(),
      author: 'Qifeng Zhang',
      datetime: XAddMinutes(this.now(), -40),
      content: this.content(),
      count: 23,
      likes: 88,
      children: [
        {
          id: '1-1',
          pid: '1',
          src: this.src(),
          author: 'San Liu',
          datetime: XAddMinutes(this.now(), -30),
          content: this.content(),
          likes: 2
        },
        {
          id: '1-2',
          pid: '1',
          src: this.src(),
          author: 'Si Liu',
          datetime: XAddMinutes(this.now(), -35),
          content: this.content(),
          likes: 0
        },
        {
          id: '1-2',
          pid: '1',
          src: this.src(),
          author: 'Wu Liu',
          datetime: XAddMinutes(this.now(), -38),
          content: this.content(),
          likes: 0
        }
      ]
    },
    {
      id: '2',
      src: this.src(),
      author: 'Muyun Li',
      datetime: XAddMinutes(this.now(), -50),
      content: this.content(),
      count: 2,
      likes: 88,
      children: [
        {
          id: '1-1',
          pid: '1',
          src: this.src(),
          author: 'San Liu',
          datetime: XAddMinutes(this.now(), -30),
          content: this.content(),
          likes: 2
        },
        {
          id: '1-2',
          pid: '1',
          src: this.src(),
          author: 'Si Liu',
          datetime: XAddMinutes(this.now(), -35),
          content: this.content(),
          likes: 0
        }
      ]
    },
    {
      id: '3',
      src: this.src(),
      author: 'Yun Liu',
      datetime: XAddHours(this.now(), -5),
      content: this.content(),
      count: 0,
      likes: 10,
      children: []
    }
  ]);

  createNode(pid: string, content: string | undefined, index = 0) {
    return {
      id: pid + '-' + Math.floor(Math.random() * 100),
      pid: pid,
      author: 'User' + index,
      datetime: XAddMinutes(new Date(), index),
      content: content,
      children: []
    } as XCommentNode;
  }

  likeClick(node: XCommentNode) {
    if (!node.likes) node.likes = 0;
    node.likes++;
  }

  sureClick(node: XCommentNode) {
    if (!node.children) node.children = [];
    let children: XCommentNode[] = [this.createNode(node.pid, node.replyContent), ...node.children];
    node.children = children;
  }

  moreClick(node: XCommentNode) {
    let nodes: XCommentNode[] = [];
    if (!node.children) node.children = [];
    for (let i = 1; i <= 10; i++) {
      nodes = [...nodes, this.createNode(node.id, node.content, -i)];
    }
    node.children = [...node.children, ...nodes];
  }
}
