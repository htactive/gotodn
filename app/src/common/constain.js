import {Platform, Dimensions} from 'react-native';

export const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export const platform = Platform.OS;

export const SlideType = {
  HomeScreen: 1,
  ListScreen: 2,
};

export const MenuListData = [
  {
    id:1,
    categoryName: 'Đồ Ăn Thức Uống',
    categoryIcon: 'ios-beer-outline',
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
    id:2,
    categoryName: 'Mua sắm',
    categoryIcon: 'ios-cart-outline',
    services: [
      {
        heroImage: 'https://tourism.danang.vn/wp-content/uploads/2017/06/lotte-mart-da-nang1-560x420.jpg',
        title: 'Chợ & khu mua sắm'
      }
    ]
  },
  {
    id:3,
    categoryName: 'Cộng đồng',
    categoryIcon: 'ios-body-outline',
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
    id:4,
    categoryName: 'Vui chơi',
    categoryIcon: 'ios-game-controller-b-outline',
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
    star: 4.5
  },
  {
    id: 2,
    heroImage: 'https://goo.gl/y84Rnm',
    title: 'Đường chạy sắc màu',
    description: 'Sự kiện La Vie Color Me Run – Đường Chạy Sắc Màu được tổ chức lần thứ 3 năm 2016 tại thành phố biển Đà Nẵng tại Công Viên Châu Á, với nhiều hoạt động mới chào đón tất cả người dân cũng như khách du lịch đến Đà Nẵng thời gian này.',
    star: 4
  },
  {
    id: 3,
    heroImage: 'https://goo.gl/5xQRBG',
    title: 'Làng nghề bánh tráng Túy Loan',
    description: 'Làng nghề bánh trang Túy Loan, xã Hòa Phong, huyện Hòa Vang nổi tiếng với nghề làm bánh tráng và mì Quảng. Theo các cụ cao niên trong làng, bánh tráng người dân làm ra được trân trọng đến mức luôn là món không thể thiếu trên bàn thờ gia tiên dịp nhà có cúng giỗ. Phong tục cứ thế truyền đời, người dân làng Túy Loan đặt cúng bánh tráng để tưởng nhớ, trân trọng một nghề truyền thống của làng.',
    star: 5
  },
  {
    id: 4,
    heroImage: 'https://goo.gl/dhzAiC',
    title: 'Công viên Châu Á – Asia Park',
    description: 'Trải rộng trên diện tích 868.694 m2 bên bờ Tây sông Hàn, công viên Châu Á – Asia Park Đà Nẵng là sự kết hợp những nét độc đáo, mới lạ của các mô hình giải trí trên thế giới với những nét văn hóa đặc sắc đậm chất Á Đông. Asia Park bao gồm ba khu vực chính: công viên giải trí ngoài trời hiện đại, công viên văn hóa với các công trình kiến trúc và nghệ thuật thu nhỏ mang tính biểu trưng của 10 quốc gia châu Á, và khu Sun Wheel – nơi giao thoa giữa nét hiện đại và truyền thống.',
    star: 3
  },
  {
    id: 5,
    heroImage: 'https://goo.gl/hcT9YD',
    title: 'Khu tắm bùn Galina Đà Nẵng',
    description: 'Galina Đà Nẵng Mud Bath & Spa là khu tắm bùn khoáng và spa đầu tiên bên bờ biển Đà Nẵng, cung cấp các gói dịch vụ tắm bùn khoáng, massage và spa chuyên nghiệp theo tiêu chuẩn 4 sao.',
    star: 2
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
    title: 'Biển Đà Nẵng',
    description: 'Trải dài trên 60 km từ chân đèo Hải Vân đến Non Nước với nhiều bãi biển cát trắng mịn, đẹp, thơ mộng và đã được bầu chọn là 01 trong 06 bãi biển quyến rũ nhất hành tinh (tạp chí Forbes, Mỹ bình chọn)',
    star: 5
  }
];