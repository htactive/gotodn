import {Platform, Dimensions} from 'react-native';
import map from './characterMap';

export const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export const platform = Platform.OS;

export const SlideType = {
  HomeScreen: 1,
  ListScreen: 2,
};

export const MenuType = {
  HomeScreen: 1,
  ListScreen: 2,
  DetailScreen: 3,
  FavoriteScreen: 4,
};

export const IconName = {
  Web: 'https://image.ibb.co/mwSu05/ic_web.png',
  Vacant: 'https://image.ibb.co/hKrMf5/ic_vacant_land.png',
  Telephone: 'https://image.ibb.co/cGJZ05/ic_tel.png',
  Location: 'https://image.ibb.co/efQsnk/ic_location.png',
  Industry: 'https://image.ibb.co/cKpSnk/ic_industry.png',
  Area: 'https://image.ibb.co/ncGySk/ic_area.png',
  Fax: 'https://image.ibb.co/hDOdSk/ic_fax.png',
  Clock: 'https://image.ibb.co/fNMbDQ/ic_time.png',

  CEatdrink: 'https://image.ibb.co/gT3905/ic_E_D.png',
  CEvent: 'https://image.ibb.co/e4mjYQ/ic_event.png',
  CGoverment: 'https://image.ibb.co/j4v07k/ic_goverment.png',
  CHealth: 'https://image.ibb.co/bvonnk/ic_health_care.png',
  CHelp: 'https://image.ibb.co/ngdnnk/ic_help.png',
  CIndustry: 'https://image.ibb.co/cKpSnk/ic_industry.png',
  CSeedo: 'https://image.ibb.co/hqRjYQ/ic_S_D.png',
  CStay: 'https://image.ibb.co/dWMJtQ/ic_stay.png',

  NoIcon: 'https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_9b3775fd-90ca-4d35-8a96-c1fceaa9b334.png',
};

export const AppIcon = {
  AppLogo: require('../../assets/icons/ic-goto.png'),
  Share: require('../../assets/icons/ic-share.png'),
  Favorite: require('../../assets/icons/ic-favorite.png'),
  // Shutdown: require('../../assets/icons/shutdown.png'),
  // Setting: require('../../assets/icons/setting.png'),
  Language: require('../../assets/icons/ic-language.png'),
  Ellipse: require('../../assets/icons/ellipse.png'),
  EllipseActive: require('../../assets/icons/ellipse_active.png'),
  Menu: require('../../assets/icons/ic-menu.png'),
  Search: require('../../assets/icons/ic-search.png'),
  Help: require('../../assets/icons/ic-help.png'),
  LocationMarker: require('../../assets/icons/location_marker.gif'),
  Down: require('../../assets/icons/ic-down.png'),
  Direction: require('../../assets/icons/ic-direction.png'),
  Link: require('../../assets/icons/ic-link.png'),
  Location: require('../../assets/icons/ic-location.png'),
  Phone: require('../../assets/icons/ic-phone.png'),
  Time: require('../../assets/icons/ic-time.png'),
  Web: require('../../assets/icons/ic-web.png'),
  Area: require('../../assets/icons/ic-area.png'),
  VacantLand: require('../../assets/icons/ic-vacant-land.png'),
  Tel: require('../../assets/icons/ic-tel.png'),
  Calling: require('../../assets/icons/ic-calling.png'),
  Fax: require('../../assets/icons/ic-fax.png'),
};

export const SlideData = [
  {
    title: 'Cuộc thi Marathon',
    subtitle: 'Cuộc thi là giải chạy Marathon chuyên nghiệp đầu tiên tại Việt Nam',
    image: 'https://goo.gl/rREKZ2',
    id: 8,
  },
  {
    title: 'Làng nghề bánh tráng Túy Loan',
    subtitle: 'Làng nghề bánh trang Túy Loan, xã Hòa Phong, huyện Hòa Vang nổi tiếng với nghề làm bánh tráng và mì Quảng.',
    image: 'https://goo.gl/5xQRBG',
    id: 8,
  },
  {
    title: 'Chùa Linh Ứng',
    subtitle: 'Chùa Linh Ứng Sơn Trà nằm tựa lưng vào đỉnh Sơn Trà vững chãi, được xem là ngôi chùa lớn nhất ở thành phố Đà Nẵng',
    image: 'https://goo.gl/5WveJi',
    id: 8,
  },
  {
    title: 'Biển Đà Nẵng',
    subtitle: 'Trải dài trên 60 km từ chân đèo Hải Vân đến Non Nước với nhiều bãi biển cát trắng mịn',
    image: 'https://goo.gl/oXyWaU',
    id: 8,
  },
  {
    title: 'Công viên Châu Á',
    subtitle: 'Trải rộng trên diện tích 868.694 m2 bên bờ Tây sông Hàn',
    image: 'https://goo.gl/dhzAiC',
    id: 8,
  },
  {
    title: 'Khu tắm bùn Galina Đà Nẵng',
    subtitle: 'Galina Đà Nẵng Mud Bath & Spa là khu tắm bùn khoáng và spa đầu tiên bên bờ biển Đà Nẵng',
    image: 'http://i.imgur.com/lceHsT6l.jpg',
    id: 8,
  }
];

export const MenuListData = [
  {
    id: 1,
    categoryName: 'Đồ Ăn Thức Uống',
    categoryIcon: IconName.CEatdrink,
    services: [
      {
        heroImage: 'http://vanvat.net/hinhanh/anhto/14714hinh-anh-nhung-ly-nuoc-giai-khat.jpg',
        title: 'Giải khát'
      },
      {
        heroImage: 'http://www.chupdep.com/wp-content/uploads/2015/12/a4.jpg',
        title: 'Món ăn ngon'
      },
      {
        heroImage: 'http://noithatart.com/wp-content/uploads/2016/01/thiet-ke-nha-hang-dep-va-lang-mang-prado-06.jpg',
        title: 'Nhà hàng'
      }
    ]
  },
  {
    id: 2,
    categoryName: 'Mua sắm',
    categoryIcon: IconName.CEvent,
    services: [
      {
        heroImage: 'https://tourism.danang.vn/wp-content/uploads/2017/06/lotte-mart-da-nang1-560x420.jpg',
        title: 'Chợ & khu mua sắm'
      }
    ]
  },
  {
    id: 3,
    categoryName: 'Cộng đồng',
    categoryIcon: IconName.CSeedo,
    services: [
      {
        heroImage: 'http://houstonlibrary.org/sites/default/files/anchor_service_passport.png',
        title: 'Nhập cảnh, hải quan'
      },
      {
        heroImage: 'http://userscontent2.emaze.com/images/16c6a1c5-ad96-4355-84fd-6515aa6b37e3/3e50fe67-935e-40e7-8a57-4a920827fee3.jpg',
        title: 'Truyền thông'
      },
      {
        heroImage: 'http://blog-xtraffic.pep.vn/wp-content/uploads/2013/12/customer-support-online.jpg',
        title: 'Hỗ trợ du khách'
      },
    ]
  },
  {
    id: 4,
    categoryName: 'Vui chơi',
    categoryIcon: IconName.CStay,
    services: [
      {
        heroImage: 'http://helio.vn/uploads/5_Cover/Play_Van%20dong.JPG',
        title: 'Khu vui chơi trong nhà'
      },
      {
        heroImage: 'http://phongnet.com/wp-content/uploads/2016/01/tieu-chuan-phong-net-cyber-game.jpg',
        title: 'Cyber Gaming Center'
      },
    ]
  },
  {
    id: 5,
    categoryName: 'Khu công nghiệp',
    categoryIcon: IconName.CIndustry,
    isNoService: true,
    services: [
      {
        heroImage: 'http://giaoducthoidai.vn/Uploaded/ngocnd/2017_04_05/1_YKIQ.jpg',
        title: ''
      },
    ],
  }
];

export const MenuListItemData = [
  {
    id: 1,
    heroImage: 'https://goo.gl/rREKZ2',
    title: 'Cuộc thi Marathon Quốc tế Đà Nẵng',
    description: 'Cuộc thi là giải chạy Marathon chuyên nghiệp đầu tiên tại Việt Nam với đường chạy được ' +
    'đo và cấp giấy chứng nhận của IAAF – AIMS (Hiệp hội Thể dục Quốc tế và Hiệp hội Marathon Quốc tế).' +
    '\nXuất phát chạy với không khí cực kỳ sôi động của một cuộc thi marathon mang tầm quốc tế, bạn sẽ ' +
    'còn được trải nghiệm cảnh vật dọc đường bờ biển của thành phố với cảnh vật của buổi sớm mai, ' +
    'nghe những âm thanh và tận hưởng làn không khí trong lành qua mỗi bước chạy. ' +
    'Hãy tham gia cuộc thi Marathon Quốc Tế Đà Nẵng để có trải nghiệm một trong những đường chạy marathon đẹp nhất của Đông Nam Á.',
    star: 4.5,
    address: 'Dọc đường Hoàng Sa – Trường Sa, T.P Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    openHour: '07h00 - 24h00',
    openHourIcon: IconName.Clock,
    images: [
      {
        id: 1,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-08-560x420.jpg'
      },
      {
        id: 2,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-07-630x420.jpg'
      },
      {
        id: 3,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-05-558x420.jpg'
      },
      {
        id: 4,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-04-460x420.jpg'
      },
      {
        id: 5,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-03-633x420.jpg'
      },
      {
        id: 6,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-02-633x420.jpg'
      }
    ]
  },
  {
    id: 2,
    heroImage: 'https://goo.gl/y84Rnm',
    title: 'Đường chạy sắc màu',
    description: 'Sự kiện La Vie Color Me Run – Đường Chạy Sắc Màu được tổ chức lần thứ 3 năm 2016 tại thành phố biển Đà Nẵng tại Công Viên Châu Á, với nhiều hoạt động mới chào đón tất cả người dân cũng như khách du lịch đến Đà Nẵng thời gian này.',
    star: 4,
    address: 'Dọc đường Hoàng Sa – Trường Sa, T.P Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    openHour: '07h00 - 24h00',
    openHourIcon: IconName.Clock,
    images: [
      {
        id: 1,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-08-560x420.jpg'
      },
      {
        id: 2,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-07-630x420.jpg'
      },
      {
        id: 3,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-05-558x420.jpg'
      },
      {
        id: 4,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-04-460x420.jpg'
      },
      {
        id: 5,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-03-633x420.jpg'
      },
      {
        id: 6,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-02-633x420.jpg'
      }
    ]
  },
  {
    id: 3,
    heroImage: 'https://goo.gl/5xQRBG',
    title: 'Làng nghề bánh tráng Túy Loan',
    description: 'Làng nghề bánh trang Túy Loan, xã Hòa Phong, huyện Hòa Vang nổi tiếng với nghề làm bánh tráng và mì Quảng. Theo các cụ cao niên trong làng, bánh tráng người dân làm ra được trân trọng đến mức luôn là món không thể thiếu trên bàn thờ gia tiên dịp nhà có cúng giỗ. Phong tục cứ thế truyền đời, người dân làng Túy Loan đặt cúng bánh tráng để tưởng nhớ, trân trọng một nghề truyền thống của làng.',
    star: 5,
    address: 'Dọc đường Hoàng Sa – Trường Sa, T.P Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    openHour: '07h00 - 24h00',
    openHourIcon: IconName.Clock,
    images: [
      {
        id: 1,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-08-560x420.jpg'
      },
      {
        id: 2,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-07-630x420.jpg'
      },
      {
        id: 3,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-05-558x420.jpg'
      },
      {
        id: 4,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-04-460x420.jpg'
      },
      {
        id: 5,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-03-633x420.jpg'
      },
      {
        id: 6,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-02-633x420.jpg'
      }
    ]
  },
  {
    id: 4,
    heroImage: 'https://goo.gl/dhzAiC',
    title: 'Công viên Châu Á – Asia Park',
    description: 'Trải rộng trên diện tích 868.694 m2 bên bờ Tây sông Hàn, công viên Châu Á – Asia Park Đà Nẵng là sự kết hợp những nét độc đáo, mới lạ của các mô hình giải trí trên thế giới với những nét văn hóa đặc sắc đậm chất Á Đông. Asia Park bao gồm ba khu vực chính: công viên giải trí ngoài trời hiện đại, công viên văn hóa với các công trình kiến trúc và nghệ thuật thu nhỏ mang tính biểu trưng của 10 quốc gia châu Á, và khu Sun Wheel – nơi giao thoa giữa nét hiện đại và truyền thống.',
    star: 3,
    address: 'Dọc đường Hoàng Sa – Trường Sa, T.P Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    openHour: '07h00 - 24h00',
    openHourIcon: IconName.Clock,
    images: [
      {
        id: 1,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-08-560x420.jpg'
      },
      {
        id: 2,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-07-630x420.jpg'
      },
      {
        id: 3,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-05-558x420.jpg'
      },
      {
        id: 4,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-04-460x420.jpg'
      },
      {
        id: 5,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-03-633x420.jpg'
      },
      {
        id: 6,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-02-633x420.jpg'
      }
    ]
  },
  {
    id: 5,
    heroImage: 'https://goo.gl/hcT9YD',
    title: 'Khu tắm bùn Galina Đà Nẵng',
    description: 'Galina Đà Nẵng Mud Bath & Spa là khu tắm bùn khoáng và spa đầu tiên bên bờ biển Đà Nẵng, cung cấp các gói dịch vụ tắm bùn khoáng, massage và spa chuyên nghiệp theo tiêu chuẩn 4 sao.',
    star: 2,
    address: 'Dọc đường Hoàng Sa – Trường Sa, T.P Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    openHour: '07h00 - 24h00',
    openHourIcon: IconName.Clock,
    images: [
      {
        id: 1,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-08-560x420.jpg'
      },
      {
        id: 2,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-07-630x420.jpg'
      },
      {
        id: 3,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-05-558x420.jpg'
      },
      {
        id: 4,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-04-460x420.jpg'
      },
      {
        id: 5,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-03-633x420.jpg'
      },
      {
        id: 6,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-02-633x420.jpg'
      }
    ]
  },
  {
    id: 6,
    heroImage: 'https://goo.gl/5WveJi',
    title: 'Chùa Linh Ứng',
    description: 'Chùa Linh Ứng Sơn Trà nằm tựa lưng vào đỉnh Sơn Trà vững chãi, được xem là ngôi chùa lớn nhất ở thành phố Đà Nẵng cả về quy mô cũng như kiến trúc nghệ thuật. Điện chính có sức chứa lớn, là nơi trang nghiêm và thanh tịnh nhất.',
    star: 5
  },
  {
    id: 7,
    heroImage: 'https://goo.gl/vBciJ6',
    title: 'Cầu quay Sông Hàn',
    description: 'Là biểu tượng của Thành phố Đà Nẵng, không chỉ ẩn chứa trong đó vẻ đẹp độc đáo hay sự thú vị của một cây cầu quay duy nhất mà còn nằm ở việc cây cầu được xây dựng bởi chính những đồng tiền chắt chiu của người dân Đà thành.',
    star: 5
  },
  {
    id: 8,
    heroImage: 'https://goo.gl/oXyWaU',
    title: 'Biển Đà Nẵng - bãi biển quyến rũ nhất hành tinh',
    description: 'Trải dài trên 60 km từ chân đèo Hải Vân đến Non Nước với nhiều bãi biển cát trắng mịn, đẹp, thơ mộng và đã được bầu chọn là 01 trong 06 bãi biển quyến rũ nhất hành tinh (tạp chí Forbes, Mỹ bình chọn)' +
    '\n\nBiển Đà Nẵng có độ sóng nhỏ, nước êm, nước trong xanh bốn mùa, không bị ô nhiễm. Độ mặn vào khoảng 60%, độ an toàn cao. Một số nơi có nhiều san hô, nguồn động thực vật ven bờ và dưới bờ biển phong phú. Điều đặc biệt là hầu hết các bãi tắm đều gần trung tâm thành phố, đường sá thuận lợi; có thể đi đến bằng nhiều loại phương tiện khác nhau.' +
    '\n\nNước biển ấm, ít sóng nên khách có thể tắm gần quanh năm, nhưng thích hợp nhất là mùa hè, khoảng từ tháng 5 đến tháng 8 dương lịch.' +
    '\n\nCác bãi tắm đều có khách sạn, nhà nghỉ, nhà hàng, và nhiều dịch vụ phong phú, tạo điều kiện thuận lợi cho du khách tắm biển vui chơi giải trí và thư giãn trên bãi biển. Hầu hết các bãi biển đều có các loại hình dịch vụ phục vụ du khách như: câu cá, lướt ván, lặn biển, du thuyền.' +
    '\n\nĐội cứu hộ các bãi tắm Đà Nẵng làm việc từ 5h00 đến 20h00 hàng ngày để đảm bảo sự an toàn cho khách tắm và nghỉ ngơi trên biển.'
    ,
    star: 5,
    address: 'Dọc đường Hoàng Sa – Trường Sa, T.P Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    openHour: '07h00 - 24h00',
    openHourIcon: IconName.Clock,
    images: [
      {
        id: 1,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-08-560x420.jpg'
      },
      {
        id: 2,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-07-630x420.jpg'
      },
      {
        id: 3,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-05-558x420.jpg'
      },
      {
        id: 4,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-04-460x420.jpg'
      },
      {
        id: 5,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-03-633x420.jpg'
      },
      {
        id: 6,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-02-633x420.jpg'
      }
    ]
  }
];

export const IndustryData = [
  {
    id: 1,
    heroImage: 'http://giaoducthoidai.vn/Uploaded/ngocnd/2017_04_05/1_YKIQ.jpg',
    title: 'Khu công nghiệp Hòa Khánh',
    description: 'Khu công nghiệp Hòa Khánh được thành lập năm 1997 và đặt tại vị thế lí tưởng gần trung tâm thành phố Đà Nẵng và cách sân bay quốc tế Đà Nẵng và nhà ga 10 km. Khu công nghiệp có các hệ thống hạ tầng hiện đại bao gồm hệ thống điện, xử lí nước thải, giao thông, nhà xưởng, nhà kho cho thuê và nguồn lao động dồi dào. Đây cũng là một trong 6 khu công nghiệp lớn nhất tại Đà Nẵng. Vì thế, cùng với những chính sách hỗ trợ, khu công nghiệp Hòa Khánh là một nơi thích hợp cho các công ty nội địa lẫn nước ngoài, hầu hết là Nhật Bản đến thành lập dự án đầu tư. ',
    star: 4.5,
    address: 'P.Hòa Khánh – Q.Liên Chiểu – TP.Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    totalArea: '1000 ha',
    totalAreaIcon: IconName.Area,
    vacantLand: ' 100 ha',
    vacantLandIcon: IconName.Vacant,
    factoryIcon: IconName.Industry,
    factoryList: [
      {
        id: 1,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-08-560x420.jpg',
        title: 'Tên nhà máy ví dụ 0001 ',
        subTitle: 'Nhà máy hoạt động sử dụng công nghệ cao',
        phone: '(84-125) 333 222',
        fax: '(84-125) 3334 555'
      },
      {
        id: 2,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-07-630x420.jpg',
        title: 'Tên nhà máy ví dụ 0001 ',
        subTitle: 'Nhà máy hoạt động sử dụng công nghệ cao',
        phone: '(84-125) 333 222',
        fax: '(84-125) 3334 555'
      },
      {
        id: 3,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-05-558x420.jpg',
        title: 'Tên nhà máy ví dụ 0001 ',
        subTitle: 'Nhà máy hoạt động sử dụng công nghệ cao',
        phone: '(84-125) 333 222',
        fax: '(84-125) 3334 555'
      },
      {
        id: 4,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-04-460x420.jpg',
        title: 'Tên nhà máy ví dụ 0001 ',
        subTitle: 'Nhà máy hoạt động sử dụng công nghệ cao',
        phone: '(84-125) 333 222',
        fax: '(84-125) 3334 555'
      },
      {
        id: 5,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-03-633x420.jpg',
        title: 'Tên nhà máy ví dụ 0001 ',
        subTitle: 'Nhà máy hoạt động sử dụng công nghệ cao',
        phone: '(84-125) 333 222',
        fax: '(84-125) 3334 555'
      },
      {
        id: 6,
        url: 'https://tourism.danang.vn/wp-content/uploads/2017/04/bien-da-nang-02-633x420.jpg',
        title: 'Tên nhà máy ví dụ 0001 ',
        subTitle: 'Nhà máy hoạt động sử dụng công nghệ cao',
        phone: '(84-125) 333 222',
        fax: '(84-125) 3334 555'
      }
    ]
  },
  {
    id: 2,
    heroImage: 'http://www.longhau.com.vn/Data/Sites/1/media/Tintuc/110416/1.jpg',
    title: 'Khu công nghiệp Số 02',
    description: 'Đây là phần nội dung của khu công nghiệp số 02. Đây là phần nội dung của khu công nghiệp số 02. Đây là phần nội dung của khu công nghiệp số 02. Đây là phần nội dung của khu công nghiệp số 02. ',
    star: 4.5,
    address: 'P.Hòa Khánh – Q.Liên Chiểu – TP.Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    totalArea: '1000 ha',
    totalAreaIcon: IconName.Area,
    vacantLand: ' 100 ha',
    vacantLandIcon: IconName.Vacant,
    factoryIcon: IconName.Industry,
  },
  {
    id: 3,
    heroImage: 'http://viipip.com/DataUpload/image/DSC00264_864x648.jpg',
    title: 'Khu công nghiệp Số 03',
    description: 'Đây là phần nội dung của khu công nghiệp. Đây là phần nội dung của khu công nghiệp.Đây là phần nội dung của khu công nghiệp.Đây là phần nội dung của khu công nghiệp.',
    star: 4.5,
    address: 'P.Hòa Khánh – Q.Liên Chiểu – TP.Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    totalArea: '1000 ha',
    totalAreaIcon: IconName.Area,
    vacantLand: ' 100 ha',
    vacantLandIcon: IconName.Vacant,
    factoryIcon: IconName.Industry,
  },
  {
    id: 4,
    heroImage: 'http://images.ndh.vn/Images/Uploaded/Share/2016/12/22/3cakcn-nhon-trach-12.png',
    title: 'Khu công nghiệp Số 04',
    description: 'Đây là phần nội dung của khu công nghiệp. Đây là phần nội dung của khu công nghiệp.Đây là phần nội dung của khu công nghiệp.Đây là phần nội dung của khu công nghiệp.',
    star: 4.5,
    address: 'P.Hòa Khánh – Q.Liên Chiểu – TP.Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    totalArea: '1000 ha',
    totalAreaIcon: IconName.Area,
    vacantLand: ' 100 ha',
    vacantLandIcon: IconName.Vacant,
    factoryIcon: IconName.Industry,
  },
  {
    id: 5,
    heroImage: 'http://bmktcn.com/UserFiles/Phamdinhtuyen/Khucongnghiep/KCNbacthanglong/toancanhKCN.JPG',
    title: 'Khu công nghiệp Số 05',
    description: 'Đây là phần nội dung của khu công nghiệp. Đây là phần nội dung của khu công nghiệp.Đây là phần nội dung của khu công nghiệp.Đây là phần nội dung của khu công nghiệp.',
    star: 4.5,
    address: 'P.Hòa Khánh – Q.Liên Chiểu – TP.Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    totalArea: '1000 ha',
    totalAreaIcon: IconName.Area,
    vacantLand: ' 100 ha',
    vacantLandIcon: IconName.Vacant,
    factoryIcon: IconName.Industry,
  }
  ,
  {
    id: 6,
    heroImage: 'http://drive.sopro.vn/s1/duongnhat/articles/nt5-zip.jpg',
    title: 'Khu công nghiệp Số 06',
    description: 'Đây là phần nội dung của khu công nghiệp. Đây là phần nội dung của khu công nghiệp.Đây là phần nội dung của khu công nghiệp.Đây là phần nội dung của khu công nghiệp.',
    star: 4.5,
    address: 'P.Hòa Khánh – Q.Liên Chiểu – TP.Đà Nẵng',
    addressIcon: IconName.Location,
    phone: '(84-125) 333 222',
    phoeneIcon: IconName.Telephone,
    fax: '(84-125) 3334 555',
    faxIcon: IconName.Fax,
    website: 'https://thongtindoanhnghiep.co/da-nang/quan-lien-chieu/khu-cong-nghiep-hoa-khanh',
    websiteIcon: IconName.Web,
    totalArea: '1000 ha',
    totalAreaIcon: IconName.Area,
    vacantLand: ' 100 ha',
    vacantLandIcon: IconName.Vacant,
    factoryIcon: IconName.Industry,
  }
];


export class LanguageEnums {
  static English = 1;
  static Vietnamese = 2;
  static Chinese = 3;
  static Japanese = 4;
  static Korean = 5;
  static France = 6;
}

export const Language = [
  {Id: LanguageEnums.Vietnamese, Name: 'Tiếng Việt', Code: ''},
  {Id: LanguageEnums.English, Name: 'English', Code: ''},
  {Id: LanguageEnums.France, Name: 'French', Code: ''},
  {Id: LanguageEnums.Chinese, Name: 'Chinese', Code: ''},
  {Id: LanguageEnums.Japanese, Name: 'Japanese', Code: ''},
  {Id: LanguageEnums.Korean, Name: 'Korean', Code: ''},
];

export class MapHelper {
  static decodePolyline(encoded) {
    if (!encoded) {
      return [];
    }
    let poly = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result = result | ((b & 0x1f) << shift);
        shift += 5;
      } while (b >= 0x20);

      let dlat = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result = result | ((b & 0x1f) << shift);
        shift += 5;
      } while (b >= 0x20);

      let dlng = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      let p = {
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      };
      poly.push(p);
    }
    return poly;
  }

  static getRegionForCoordinates(points) {
    let minX, maxX, minY, maxY;

    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX) + (maxX - minX) * .4;
    const deltaY = (maxY - minY) + (maxY - minY) * .4;

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    };
  }

  static getRandomDestination() {
    let id = Math.floor((Math.random() * this.destinations.length));
    return this.destinations[id];
  }

  static destinations = [
    {
      latitude: 16.0699448,
      longitude: 108.2241556,
    },
    {
      latitude: 16.0715812,
      longitude: 108.2005879,
    },
    {
      latitude: 16.0755271,
      longitude: 108.1448972,
    },
    {
      latitude: 16.05036,
      longitude: 108.150634,
    },

    {
      latitude: 16.056302,
      longitude: 108.1860076,
    },
    {
      latitude: 16.0387819,
      longitude: 108.2073699,
    },
    {
      latitude: 16.0069699,
      longitude: 108.2192207,
    },
    {
      latitude: 16.0022288,
      longitude: 108.2534457,
    },
    {
      latitude: 16.0394033,
      longitude: 108.2441354,
    },
    {
      latitude: 16.020549,
      longitude: 108.1989321,
    }
  ];
}

export class Helper {
  static CloneObject(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  static stripDiacritics(str) {
    for (let i = 0; i < map.length; i++) {
      str = str.replace(map[i].letters, map[i].base);
    }
    return str;
  };

  static ImageUrl = "https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_8323f5ac-fad6-4c2d-a1ca-2276af4a4a99.jpg";
  static IconUrl = "https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_6105178d-8189-46d8-b446-f7fdb5860523.png";

  static LanguageKey = 'LanguageKey';
  static CityKey = 'CityKey';
  static FavoriteKey = 'FavoriteKey';
  static CategoryKey = 'CategoryArray';
  static SeparateKey = '||';
}

export function Guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}