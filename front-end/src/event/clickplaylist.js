import { useState } from "react";

function ClickPlayList() {
    let linkImg = "../data/img/mu.jpg";
    let nameSong = "Glory ManU";

    const [showImage, setShowImage] = useState(false);

    // Hàm xử lý sự kiện khi nhấn vào thẻ div
    const handleClick = () => {
        // Thay đổi state để hiển thị ảnh
        if (!showImage) setShowImage(true);
        else setShowImage(false);
    };

    return { linkImg, nameSong, showImage, handleClick };
}

export default ClickPlayList;