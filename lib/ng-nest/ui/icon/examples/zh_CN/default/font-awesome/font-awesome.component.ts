import { Component, signal } from '@angular/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XTabsComponent, XTabComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-font-awesome',
  standalone: true,
  imports: [XIconComponent, XTabsComponent, XTabComponent, XRowComponent, XColComponent],
  templateUrl: './font-awesome.component.html',
  styleUrls: ['./font-awesome.component.scss']
})
export class ExFontAwesomeComponent {
  tabs = signal([
    {
      type: 'fab',
      name: 'Brands',
      icons: [
        '500px',
        'accessible-icon',
        'accusoft',
        'acquisitions-incorporated',
        'adn',
        'adobe',
        'adversal',
        'affiliatetheme',
        'airbnb',
        'algolia',
        'alipay',
        'amazon-pay',
        'amazon',
        'amilia',
        'android',
        'angellist',
        'angrycreative',
        'angular',
        'app-store-ios',
        'app-store',
        'apper',
        'apple-pay',
        'apple',
        'artstation',
        'asymmetrik',
        'atlassian',
        'audible',
        'autoprefixer',
        'avianex',
        'aviato',
        'aws',
        'bandcamp',
        'battle-net',
        'behance-square',
        'behance',
        'bimobject',
        'bitbucket',
        'bitcoin',
        'bity',
        'black-tie',
        'blackberry',
        'blogger-b',
        'blogger',
        'bluetooth-b',
        'bluetooth',
        'bootstrap',
        'btc',
        'buffer',
        'buromobelexperte',
        'buysellads',
        'canadian-maple-leaf',
        'cc-amazon-pay',
        'cc-amex',
        'cc-apple-pay',
        'cc-diners-club',
        'cc-discover',
        'cc-jcb',
        'cc-mastercard',
        'cc-paypal',
        'cc-stripe',
        'cc-visa',
        'centercode',
        'centos',
        'chrome',
        'chromecast',
        'cloudscale',
        'cloudsmith',
        'cloudversify',
        'codepen',
        'codiepie',
        'confluence',
        'connectdevelop',
        'contao',
        'cpanel',
        'creative-commons-by',
        'creative-commons-nc-eu',
        'creative-commons-nc-jp',
        'creative-commons-nc',
        'creative-commons-nd',
        'creative-commons-pd-alt',
        'creative-commons-pd',
        'creative-commons-remix',
        'creative-commons-sa',
        'creative-commons-sampling-plus',
        'creative-commons-sampling',
        'creative-commons-share',
        'creative-commons-zero',
        'creative-commons',
        'critical-role',
        'css3-alt',
        'css3',
        'cuttlefish',
        'd-and-d-beyond',
        'd-and-d',
        'dashcube',
        'delicious',
        'deploydog',
        'deskpro',
        'dev',
        'deviantart',
        'dhl',
        'diaspora',
        'digg',
        'digital-ocean',
        'discord',
        'discourse',
        'dochub',
        'docker',
        'draft2digital',
        'dribbble-square',
        'dribbble',
        'dropbox',
        'drupal',
        'dyalog',
        'earlybirds',
        'ebay',
        'edge',
        'elementor',
        'ello',
        'ember',
        'empire',
        'envira',
        'erlang',
        'ethereum',
        'etsy',
        'evernote',
        'expeditedssl',
        'facebook-f',
        'facebook-messenger',
        'facebook-square',
        'facebook',
        'fantasy-flight-games',
        'fedex',
        'fedora',
        'figma',
        'firefox',
        'first-order-alt',
        'first-order',
        'firstdraft',
        'flickr',
        'flipboard',
        'fly',
        'font-awesome-alt',
        'font-awesome-flag',
        'font-awesome-logo-full',
        'font-awesome',
        'fonticons-fi',
        'fonticons',
        'fort-awesome-alt',
        'fort-awesome',
        'forumbee',
        'foursquare',
        'free-code-camp',
        'freebsd',
        'fulcrum',
        'galactic-republic',
        'galactic-senate',
        'get-pocket',
        'gg-circle',
        'gg',
        'git-square',
        'git',
        'github-alt',
        'github-square',
        'github',
        'gitkraken',
        'gitlab',
        'gitter',
        'glide-g',
        'glide',
        'gofore',
        'goodreads-g',
        'goodreads',
        'google-drive',
        'google-play',
        'google-plus-g',
        'google-plus-square',
        'google-plus',
        'google-wallet',
        'google',
        'gratipay',
        'grav',
        'gripfire',
        'grunt',
        'gulp',
        'hacker-news-square',
        'hacker-news',
        'hackerrank',
        'hips',
        'hire-a-helper',
        'hooli',
        'hornbill',
        'hotjar',
        'houzz',
        'html5',
        'hubspot',
        'imdb',
        'instagram',
        'intercom',
        'internet-explorer',
        'invision',
        'ioxhost',
        'itch-io',
        'itunes-note',
        'itunes',
        'java',
        'jedi-order',
        'jenkins',
        'jira',
        'joget',
        'joomla',
        'js-square',
        'js',
        'jsfiddle',
        'kaggle',
        'keybase',
        'keycdn',
        'kickstarter-k',
        'kickstarter',
        'korvue',
        'laravel',
        'lastfm-square',
        'lastfm',
        'leanpub',
        'less',
        'line',
        'linkedin-in',
        'linkedin',
        'linode',
        'linux',
        'lyft',
        'magento',
        'mailchimp',
        'mandalorian',
        'markdown',
        'mastodon',
        'maxcdn',
        'medapps',
        'medium-m',
        'medium',
        'medrt',
        'meetup',
        'megaport',
        'mendeley',
        'microsoft',
        'mix',
        'mixcloud',
        'mizuni',
        'modx',
        'monero',
        'napster',
        'neos',
        'nimblr',
        'nintendo-switch',
        'node-js',
        'node',
        'npm',
        'ns8',
        'nutritionix',
        'odnoklassniki-square',
        'odnoklassniki',
        'old-republic',
        'opencart',
        'openid',
        'opera',
        'optin-monster',
        'osi',
        'page4',
        'pagelines',
        'palfed',
        'patreon',
        'paypal',
        'penny-arcade',
        'periscope',
        'phabricator',
        'phoenix-framework',
        'phoenix-squadron',
        'php',
        'pied-piper-alt',
        'pied-piper-hat',
        'pied-piper-pp',
        'pied-piper',
        'pinterest-p',
        'pinterest-square',
        'pinterest',
        'playstation',
        'product-hunt',
        'pushed',
        'python',
        'qq',
        'quinscape',
        'quora',
        'r-project',
        'raspberry-pi',
        'ravelry',
        'react',
        'reacteurope',
        'readme',
        'rebel',
        'red-river',
        'reddit-alien',
        'reddit-square',
        'reddit',
        'redhat',
        'renren',
        'replyd',
        'researchgate',
        'resolving',
        'rev',
        'rocketchat',
        'rockrms',
        'safari',
        'salesforce',
        'sass',
        'schlix',
        'scribd',
        'searchengin',
        'sellcast',
        'sellsy',
        'servicestack',
        'shirtsinbulk',
        'shopware',
        'simplybuilt',
        'sistrix',
        'sith',
        'sketch',
        'skyatlas',
        'skype',
        'slack-hash',
        'slack',
        'slideshare',
        'snapchat-ghost',
        'snapchat-square',
        'snapchat',
        'soundcloud',
        'sourcetree',
        'speakap',
        'speaker-deck',
        'spotify',
        'squarespace',
        'stack-exchange',
        'stack-overflow',
        'staylinked',
        'steam-square',
        'steam-symbol',
        'steam',
        'sticker-mule',
        'strava',
        'stripe-s',
        'stripe',
        'studiovinari',
        'stumbleupon-circle',
        'stumbleupon',
        'superpowers',
        'supple',
        'suse',
        'symfony',
        'teamspeak',
        'telegram-plane',
        'telegram',
        'tencent-weibo',
        'the-red-yeti',
        'themeco',
        'themeisle',
        'think-peaks',
        'trade-federation',
        'trello',
        'tripadvisor',
        'tumblr-square',
        'tumblr',
        'twitch',
        'twitter-square',
        'twitter',
        'typo3',
        'uber',
        'ubuntu',
        'uikit',
        'uniregistry',
        'untappd',
        'ups',
        'usb',
        'usps',
        'ussunnah',
        'vaadin',
        'viacoin',
        'viadeo-square',
        'viadeo',
        'viber',
        'vimeo-square',
        'vimeo-v',
        'vimeo',
        'vine',
        'vk',
        'vnv',
        'vuejs',
        'waze',
        'weebly',
        'weibo',
        'weixin',
        'whatsapp-square',
        'whatsapp',
        'whmcs',
        'wikipedia-w',
        'windows',
        'wix',
        'wizards-of-the-coast',
        'wolf-pack-battalion',
        'wordpress-simple',
        'wordpress',
        'wpbeginner',
        'wpexplorer',
        'wpforms',
        'wpressr',
        'xbox',
        'xing-square',
        'xing',
        'y-combinator',
        'yahoo',
        'yammer',
        'yandex-international',
        'yandex',
        'yarn',
        'yelp',
        'yoast',
        'youtube-square',
        'youtube',
        'zhihu'
      ]
    },
    {
      type: 'far',
      name: 'Regular',
      icons: [
        'address-book',
        'address-card',
        'angry',
        'arrow-alt-circle-down',
        'arrow-alt-circle-left',
        'arrow-alt-circle-right',
        'arrow-alt-circle-up',
        'bell-slash',
        'bell',
        'bookmark',
        'building',
        'calendar-alt',
        'calendar-check',
        'calendar-minus',
        'calendar-plus',
        'calendar-times',
        'calendar',
        'caret-square-down',
        'caret-square-left',
        'caret-square-right',
        'caret-square-up',
        'chart-bar',
        'check-circle',
        'check-square',
        'circle',
        'clipboard',
        'clock',
        'clone',
        'closed-captioning',
        'comment-alt',
        'comment-dots',
        'comment',
        'comments',
        'compass',
        'copy',
        'copyright',
        'credit-card',
        'dizzy',
        'dot-circle',
        'edit',
        'envelope-open',
        'envelope',
        'eye-slash',
        'eye',
        'file-alt',
        'file-archive',
        'file-audio',
        'file-code',
        'file-excel',
        'file-image',
        'file-pdf',
        'file-powerpoint',
        'file-video',
        'file-word',
        'file',
        'flag',
        'flushed',
        'folder-open',
        'folder',
        'font-awesome-logo-full',
        'frown-open',
        'frown',
        'futbol',
        'gem',
        'grimace',
        'grin-alt',
        'grin-beam-sweat',
        'grin-beam',
        'grin-hearts',
        'grin-squint-tears',
        'grin-squint',
        'grin-stars',
        'grin-tears',
        'grin-tongue-squint',
        'grin-tongue-wink',
        'grin-tongue',
        'grin-wink',
        'grin',
        'hand-lizard',
        'hand-paper',
        'hand-peace',
        'hand-point-down',
        'hand-point-left',
        'hand-point-right',
        'hand-point-up',
        'hand-pointer',
        'hand-rock',
        'hand-scissors',
        'hand-spock',
        'handshake',
        'hdd',
        'heart',
        'hospital',
        'hourglass',
        'id-badge',
        'id-card',
        'image',
        'images',
        'keyboard',
        'kiss-beam',
        'kiss-wink-heart',
        'kiss',
        'laugh-beam',
        'laugh-squint',
        'laugh-wink',
        'laugh',
        'lemon',
        'life-ring',
        'lightbulb',
        'list-alt',
        'map',
        'meh-blank',
        'meh-rolling-eyes',
        'meh',
        'minus-square',
        'money-bill-alt',
        'moon',
        'newspaper',
        'object-group',
        'object-ungroup',
        'paper-plane',
        'pause-circle',
        'play-circle',
        'plus-square',
        'question-circle',
        'registered',
        'sad-cry',
        'sad-tear',
        'save',
        'share-square',
        'smile-beam',
        'smile-wink',
        'smile',
        'snowflake',
        'square',
        'star-half',
        'star',
        'sticky-note',
        'stop-circle',
        'sun',
        'surprise',
        'thumbs-down',
        'thumbs-up',
        'times-circle',
        'tired',
        'trash-alt',
        'user-circle',
        'user',
        'window-close',
        'window-maximize',
        'window-minimize',
        'window-restore'
      ]
    },
    {
      type: 'fas',
      name: 'Solid',
      icons: [
        'ad',
        'address-book',
        'address-card',
        'adjust',
        'air-freshener',
        'align-center',
        'align-justify',
        'align-left',
        'align-right',
        'allergies',
        'ambulance',
        'american-sign-language-interpreting',
        'anchor',
        'angle-double-down',
        'angle-double-left',
        'angle-double-right',
        'angle-double-up',
        'angle-down',
        'angle-left',
        'angle-right',
        'angle-up',
        'angry',
        'ankh',
        'apple-alt',
        'archive',
        'archway',
        'arrow-alt-circle-down',
        'arrow-alt-circle-left',
        'arrow-alt-circle-right',
        'arrow-alt-circle-up',
        'arrow-circle-down',
        'arrow-circle-left',
        'arrow-circle-right',
        'arrow-circle-up',
        'arrow-down',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'arrows-alt-h',
        'arrows-alt-v',
        'arrows-alt',
        'assistive-listening-systems',
        'asterisk',
        'at',
        'atlas',
        'atom',
        'audio-description',
        'award',
        'baby-carriage',
        'baby',
        'backspace',
        'backward',
        'bacon',
        'balance-scale',
        'ban',
        'band-aid',
        'barcode',
        'bars',
        'baseball-ball',
        'basketball-ball',
        'bath',
        'battery-empty',
        'battery-full',
        'battery-half',
        'battery-quarter',
        'battery-three-quarters',
        'bed',
        'beer',
        'bell-slash',
        'bell',
        'bezier-curve',
        'bible',
        'bicycle',
        'binoculars',
        'biohazard',
        'birthday-cake',
        'blender-phone',
        'blender',
        'blind',
        'blog',
        'bold',
        'bolt',
        'bomb',
        'bone',
        'bong',
        'book-dead',
        'book-medical',
        'book-open',
        'book-reader',
        'book',
        'bookmark',
        'bowling-ball',
        'box-open',
        'box',
        'boxes',
        'braille',
        'brain',
        'bread-slice',
        'briefcase-medical',
        'briefcase',
        'broadcast-tower',
        'broom',
        'brush',
        'bug',
        'building',
        'bullhorn',
        'bullseye',
        'burn',
        'bus-alt',
        'bus',
        'business-time',
        'calculator',
        'calendar-alt',
        'calendar-check',
        'calendar-day',
        'calendar-minus',
        'calendar-plus',
        'calendar-times',
        'calendar-week',
        'calendar',
        'camera-retro',
        'camera',
        'campground',
        'candy-cane',
        'cannabis',
        'capsules',
        'car-alt',
        'car-battery',
        'car-crash',
        'car-side',
        'car',
        'caret-down',
        'caret-left',
        'caret-right',
        'caret-square-down',
        'caret-square-left',
        'caret-square-right',
        'caret-square-up',
        'caret-up',
        'carrot',
        'cart-arrow-down',
        'cart-plus',
        'cash-register',
        'cat',
        'certificate',
        'chair',
        'chalkboard-teacher',
        'chalkboard',
        'charging-station',
        'chart-area',
        'chart-bar',
        'chart-line',
        'chart-pie',
        'check-circle',
        'check-double',
        'check-square',
        'check',
        'cheese',
        'chess-bishop',
        'chess-board',
        'chess-king',
        'chess-knight',
        'chess-pawn',
        'chess-queen',
        'chess-rook',
        'chess',
        'chevron-circle-down',
        'chevron-circle-left',
        'chevron-circle-right',
        'chevron-circle-up',
        'chevron-down',
        'chevron-left',
        'chevron-right',
        'chevron-up',
        'child',
        'church',
        'circle-notch',
        'circle',
        'city',
        'clinic-medical',
        'clipboard-check',
        'clipboard-list',
        'clipboard',
        'clock',
        'clone',
        'closed-captioning',
        'cloud-download-alt',
        'cloud-meatball',
        'cloud-moon-rain',
        'cloud-moon',
        'cloud-rain',
        'cloud-showers-heavy',
        'cloud-sun-rain',
        'cloud-sun',
        'cloud-upload-alt',
        'cloud',
        'cocktail',
        'code-branch',
        'code',
        'coffee',
        'cog',
        'cogs',
        'coins',
        'columns',
        'comment-alt',
        'comment-dollar',
        'comment-dots',
        'comment-medical',
        'comment-slash',
        'comment',
        'comments-dollar',
        'comments',
        'compact-disc',
        'compass',
        'compress-arrows-alt',
        'compress',
        'concierge-bell',
        'cookie-bite',
        'cookie',
        'copy',
        'copyright',
        'couch',
        'credit-card',
        'crop-alt',
        'crop',
        'cross',
        'crosshairs',
        'crow',
        'crown',
        'crutch',
        'cube',
        'cubes',
        'cut',
        'database',
        'deaf',
        'democrat',
        'desktop',
        'dharmachakra',
        'diagnoses',
        'dice-d20',
        'dice-d6',
        'dice-five',
        'dice-four',
        'dice-one',
        'dice-six',
        'dice-three',
        'dice-two',
        'dice',
        'digital-tachograph',
        'directions',
        'divide',
        'dizzy',
        'dna',
        'dog',
        'dollar-sign',
        'dolly-flatbed',
        'dolly',
        'donate',
        'door-closed',
        'door-open',
        'dot-circle',
        'dove',
        'download',
        'drafting-compass',
        'dragon',
        'draw-polygon',
        'drum-steelpan',
        'drum',
        'drumstick-bite',
        'dumbbell',
        'dumpster-fire',
        'dumpster',
        'dungeon',
        'edit',
        'egg',
        'eject',
        'ellipsis-h',
        'ellipsis-v',
        'envelope-open-text',
        'envelope-open',
        'envelope-square',
        'envelope',
        'equals',
        'eraser',
        'ethernet',
        'euro-sign',
        'exchange-alt',
        'exclamation-circle',
        'exclamation-triangle',
        'exclamation',
        'expand-arrows-alt',
        'expand',
        'external-link-alt',
        'external-link-square-alt',
        'eye-dropper',
        'eye-slash',
        'eye',
        'fast-backward',
        'fast-forward',
        'fax',
        'feather-alt',
        'feather',
        'female',
        'fighter-jet',
        'file-alt',
        'file-archive',
        'file-audio',
        'file-code',
        'file-contract',
        'file-csv',
        'file-download',
        'file-excel',
        'file-export',
        'file-image',
        'file-import',
        'file-invoice-dollar',
        'file-invoice',
        'file-medical-alt',
        'file-medical',
        'file-pdf',
        'file-powerpoint',
        'file-prescription',
        'file-signature',
        'file-upload',
        'file-video',
        'file-word',
        'file',
        'fill-drip',
        'fill',
        'film',
        'filter',
        'fingerprint',
        'fire-alt',
        'fire-extinguisher',
        'fire',
        'first-aid',
        'fish',
        'fist-raised',
        'flag-checkered',
        'flag-usa',
        'flag',
        'flask',
        'flushed',
        'folder-minus',
        'folder-open',
        'folder-plus',
        'folder',
        'font-awesome-logo-full',
        'font',
        'football-ball',
        'forward',
        'frog',
        'frown-open',
        'frown',
        'funnel-dollar',
        'futbol',
        'gamepad',
        'gas-pump',
        'gavel',
        'gem',
        'genderless',
        'ghost',
        'gift',
        'gifts',
        'glass-cheers',
        'glass-martini-alt',
        'glass-martini',
        'glass-whiskey',
        'glasses',
        'globe-africa',
        'globe-americas',
        'globe-asia',
        'globe-europe',
        'globe',
        'golf-ball',
        'gopuram',
        'graduation-cap',
        'greater-than-equal',
        'greater-than',
        'grimace',
        'grin-alt',
        'grin-beam-sweat',
        'grin-beam',
        'grin-hearts',
        'grin-squint-tears',
        'grin-squint',
        'grin-stars',
        'grin-tears',
        'grin-tongue-squint',
        'grin-tongue-wink',
        'grin-tongue',
        'grin-wink',
        'grin',
        'grip-horizontal',
        'grip-lines-vertical',
        'grip-lines',
        'grip-vertical',
        'guitar',
        'h-square',
        'hamburger',
        'hammer',
        'hamsa',
        'hand-holding-heart',
        'hand-holding-usd',
        'hand-holding',
        'hand-lizard',
        'hand-middle-finger',
        'hand-paper',
        'hand-peace',
        'hand-point-down',
        'hand-point-left',
        'hand-point-right',
        'hand-point-up',
        'hand-pointer',
        'hand-rock',
        'hand-scissors',
        'hand-spock',
        'hands-helping',
        'hands',
        'handshake',
        'hanukiah',
        'hard-hat',
        'hashtag',
        'hat-wizard',
        'haykal',
        'hdd',
        'heading',
        'headphones-alt',
        'headphones',
        'headset',
        'heart-broken',
        'heart',
        'heartbeat',
        'helicopter',
        'highlighter',
        'hiking',
        'hippo',
        'history',
        'hockey-puck',
        'holly-berry',
        'home',
        'horse-head',
        'horse',
        'hospital-alt',
        'hospital-symbol',
        'hospital',
        'hot-tub',
        'hotdog',
        'hotel',
        'hourglass-end',
        'hourglass-half',
        'hourglass-start',
        'hourglass',
        'house-damage',
        'hryvnia',
        'i-cursor',
        'ice-cream',
        'icicles',
        'id-badge',
        'id-card-alt',
        'id-card',
        'igloo',
        'image',
        'images',
        'inbox',
        'indent',
        'industry',
        'infinity',
        'info-circle',
        'info',
        'italic',
        'jedi',
        'joint',
        'journal-whills',
        'kaaba',
        'key',
        'keyboard',
        'khanda',
        'kiss-beam',
        'kiss-wink-heart',
        'kiss',
        'kiwi-bird',
        'landmark',
        'language',
        'laptop-code',
        'laptop-medical',
        'laptop',
        'laugh-beam',
        'laugh-squint',
        'laugh-wink',
        'laugh',
        'layer-group',
        'leaf',
        'lemon',
        'less-than-equal',
        'less-than',
        'level-down-alt',
        'level-up-alt',
        'life-ring',
        'lightbulb',
        'link',
        'lira-sign',
        'list-alt',
        'list-ol',
        'list-ul',
        'list',
        'location-arrow',
        'lock-open',
        'lock',
        'long-arrow-alt-down',
        'long-arrow-alt-left',
        'long-arrow-alt-right',
        'long-arrow-alt-up',
        'low-vision',
        'luggage-cart',
        'magic',
        'magnet',
        'mail-bulk',
        'male',
        'map-marked-alt',
        'map-marked',
        'map-marker-alt',
        'map-marker',
        'map-pin',
        'map-signs',
        'map',
        'marker',
        'mars-double',
        'mars-stroke-h',
        'mars-stroke-v',
        'mars-stroke',
        'mars',
        'mask',
        'medal',
        'medkit',
        'meh-blank',
        'meh-rolling-eyes',
        'meh',
        'memory',
        'menorah',
        'mercury',
        'meteor',
        'microchip',
        'microphone-alt-slash',
        'microphone-alt',
        'microphone-slash',
        'microphone',
        'microscope',
        'minus-circle',
        'minus-square',
        'minus',
        'mitten',
        'mobile-alt',
        'mobile',
        'money-bill-alt',
        'money-bill-wave-alt',
        'money-bill-wave',
        'money-bill',
        'money-check-alt',
        'money-check',
        'monument',
        'moon',
        'mortar-pestle',
        'mosque',
        'motorcycle',
        'mountain',
        'mouse-pointer',
        'mug-hot',
        'music',
        'network-wired',
        'neuter',
        'newspaper',
        'not-equal',
        'notes-medical',
        'object-group',
        'object-ungroup',
        'oil-can',
        'om',
        'otter',
        'outdent',
        'pager',
        'paint-brush',
        'paint-roller',
        'palette',
        'pallet',
        'paper-plane',
        'paperclip',
        'parachute-box',
        'paragraph',
        'parking',
        'passport',
        'pastafarianism',
        'paste',
        'pause-circle',
        'pause',
        'paw',
        'peace',
        'pen-alt',
        'pen-fancy',
        'pen-nib',
        'pen-square',
        'pen',
        'pencil-alt',
        'pencil-ruler',
        'people-carry',
        'pepper-hot',
        'percent',
        'percentage',
        'person-booth',
        'phone-slash',
        'phone-square',
        'phone-volume',
        'phone',
        'piggy-bank',
        'pills',
        'pizza-slice',
        'place-of-worship',
        'plane-arrival',
        'plane-departure',
        'plane',
        'play-circle',
        'play',
        'plug',
        'plus-circle',
        'plus-square',
        'plus',
        'podcast',
        'poll-h',
        'poll',
        'poo-storm',
        'poo',
        'poop',
        'portrait',
        'pound-sign',
        'power-off',
        'pray',
        'praying-hands',
        'prescription-bottle-alt',
        'prescription-bottle',
        'prescription',
        'print',
        'procedures',
        'project-diagram',
        'puzzle-piece',
        'qrcode',
        'question-circle',
        'question',
        'quidditch',
        'quote-left',
        'quote-right',
        'quran',
        'radiation-alt',
        'radiation',
        'rainbow',
        'random',
        'receipt',
        'recycle',
        'redo-alt',
        'redo',
        'registered',
        'reply-all',
        'reply',
        'republican',
        'restroom',
        'retweet',
        'ribbon',
        'ring',
        'road',
        'robot',
        'rocket',
        'route',
        'rss-square',
        'rss',
        'ruble-sign',
        'ruler-combined',
        'ruler-horizontal',
        'ruler-vertical',
        'ruler',
        'running',
        'rupee-sign',
        'sad-cry',
        'sad-tear',
        'satellite-dish',
        'satellite',
        'save',
        'school',
        'screwdriver',
        'scroll',
        'sd-card',
        'search-dollar',
        'search-location',
        'search-minus',
        'search-plus',
        'search',
        'seedling',
        'server',
        'shapes',
        'share-alt-square',
        'share-alt',
        'share-square',
        'share',
        'shekel-sign',
        'shield-alt',
        'ship',
        'shipping-fast',
        'shoe-prints',
        'shopping-bag',
        'shopping-basket',
        'shopping-cart',
        'shower',
        'shuttle-van',
        'sign-in-alt',
        'sign-language',
        'sign-out-alt',
        'sign',
        'signal',
        'signature',
        'sim-card',
        'sitemap',
        'skating',
        'skiing-nordic',
        'skiing',
        'skull-crossbones',
        'skull',
        'slash',
        'sleigh',
        'sliders-h',
        'smile-beam',
        'smile-wink',
        'smile',
        'smog',
        'smoking-ban',
        'smoking',
        'sms',
        'snowboarding',
        'snowflake',
        'snowman',
        'snowplow',
        'socks',
        'solar-panel',
        'sort-alpha-down',
        'sort-alpha-up',
        'sort-amount-down',
        'sort-amount-up',
        'sort-down',
        'sort-numeric-down',
        'sort-numeric-up',
        'sort-up',
        'sort',
        'spa',
        'space-shuttle',
        'spider',
        'spinner',
        'splotch',
        'spray-can',
        'square-full',
        'square-root-alt',
        'square',
        'stamp',
        'star-and-crescent',
        'star-half-alt',
        'star-half',
        'star-of-david',
        'star-of-life',
        'star',
        'step-backward',
        'step-forward',
        'stethoscope',
        'sticky-note',
        'stop-circle',
        'stop',
        'stopwatch',
        'store-alt',
        'store',
        'stream',
        'street-view',
        'strikethrough',
        'stroopwafel',
        'subscript',
        'subway',
        'suitcase-rolling',
        'suitcase',
        'sun',
        'superscript',
        'surprise',
        'swatchbook',
        'swimmer',
        'swimming-pool',
        'synagogue',
        'sync-alt',
        'sync',
        'syringe',
        'table-tennis',
        'table',
        'tablet-alt',
        'tablet',
        'tablets',
        'tachometer-alt',
        'tag',
        'tags',
        'tape',
        'tasks',
        'taxi',
        'teeth-open',
        'teeth',
        'temperature-high',
        'temperature-low',
        'tenge',
        'terminal',
        'text-height',
        'text-width',
        'th-large',
        'th-list',
        'th',
        'theater-masks',
        'thermometer-empty',
        'thermometer-full',
        'thermometer-half',
        'thermometer-quarter',
        'thermometer-three-quarters',
        'thermometer',
        'thumbs-down',
        'thumbs-up',
        'thumbtack',
        'ticket-alt',
        'times-circle',
        'times',
        'tint-slash',
        'tint',
        'tired',
        'toggle-off',
        'toggle-on',
        'toilet-paper',
        'toilet',
        'toolbox',
        'tools',
        'tooth',
        'torah',
        'torii-gate',
        'tractor',
        'trademark',
        'traffic-light',
        'train',
        'tram',
        'transgender-alt',
        'transgender',
        'trash-alt',
        'trash-restore-alt',
        'trash-restore',
        'trash',
        'tree',
        'trophy',
        'truck-loading',
        'truck-monster',
        'truck-moving',
        'truck-pickup',
        'truck',
        'tshirt',
        'tty',
        'tv',
        'umbrella-beach',
        'umbrella',
        'underline',
        'undo-alt',
        'undo',
        'universal-access',
        'university',
        'unlink',
        'unlock-alt',
        'unlock',
        'upload',
        'user-alt-slash',
        'user-alt',
        'user-astronaut',
        'user-check',
        'user-circle',
        'user-clock',
        'user-cog',
        'user-edit',
        'user-friends',
        'user-graduate',
        'user-injured',
        'user-lock',
        'user-md',
        'user-minus',
        'user-ninja',
        'user-nurse',
        'user-plus',
        'user-secret',
        'user-shield',
        'user-slash',
        'user-tag',
        'user-tie',
        'user-times',
        'user',
        'users-cog',
        'users',
        'utensil-spoon',
        'utensils',
        'vector-square',
        'venus-double',
        'venus-mars',
        'venus',
        'vial',
        'vials',
        'video-slash',
        'video',
        'vihara',
        'volleyball-ball',
        'volume-down',
        'volume-mute',
        'volume-off',
        'volume-up',
        'vote-yea',
        'vr-cardboard',
        'walking',
        'wallet',
        'warehouse',
        'water',
        'wave-square',
        'weight-hanging',
        'weight',
        'wheelchair',
        'wifi',
        'wind',
        'window-close',
        'window-maximize',
        'window-minimize',
        'window-restore',
        'wine-bottle',
        'wine-glass-alt',
        'wine-glass',
        'won-sign',
        'wrench',
        'x-ray',
        'yen-sign',
        'yin-yang'
      ]
    }
  ])
}
