// ngwindow.addEventListener("load", () => {
//     treeViewContentClicker();
// });
// var currentTreeTitle = "";
// function treeViewContentClicker() {
//     const contentValue = Array.from(document.querySelectorAll(".text_block_code"));
//     Array.from(document.getElementsByTagName("a")).forEach(function (node) {
//         if (node.classList.contains("tree-nav__item-title")) {
//             node.addEventListener('click', function () {
//                 var valueName = node.innerHTML;
//                 if (currentTreeTitle != valueName) {
//                     currentTreeTitle = valueName;
//                     var contentToShow = contentValue.find(item => item.dataset.articleName === valueName);
//                     var contentToHide = contentValue.find(item => item.classList.contains('text_block_code--current'));
//                     if (typeof contentToShow !== "undefined") {
//                         contentToShow.classList.add('text_block_code--current');
//                         contentToHide.classList.remove('text_block_code--current');
//                     }
//                     var currentSelctedTitle = document.querySelector(".tree-nav__item-title--current");
//                     if (currentSelctedTitle == null) {
//                         node.classList.add("tree-nav__item-title--current");
//                     }
//                     else {
//                         currentSelctedTitle.classList.remove("tree-nav__item-title--current");
//                         node.classList.add("tree-nav__item-title--current");
//                     }
//                 }
//             })
//         }
//     });
    
// };
