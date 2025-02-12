import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { gsap } from "gsap";
import { CSSPlugin } from 'gsap/CSSPlugin';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrl: './card-carousel.component.scss'
})
export class CardCarouselComponent implements OnInit {
  firstImage = "../../../../../assets/images/architect.jpg";
  secondImage = "../../../../../assets/images/construction.jpg";
  thirdImage = "../../../../../assets/images/engineer.jpg";

  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document) {
  }
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(
        {
          CSSPlugin
        }
      );
      this.carouselElement();
    }
  }


carouselElement(){

    const buttons: { prev: HTMLElement; next: HTMLElement } = {
      prev: this.document.querySelector(".btn--left")!,
      next: this.document.querySelector(".btn--right")!,
    };
    const cardsContainerEl: HTMLElement = this.document.querySelector(".cards__wrapper")!;
    const appBgContainerEl: HTMLElement = this.document.querySelector(".app__bg")!;
    // const sizeOfSideCard = "20em";
    const cardInfosContainerEl: HTMLElement = this.document.querySelector(".info__wrapper")!;

    buttons.next.addEventListener("click", () => swapCards("right"));

    buttons.prev.addEventListener("click", () => swapCards("left"));

    function swapCards(direction: "left" | "right") {
      const currentCardEl = cardsContainerEl.querySelector(".current--card") as HTMLElement;
      const previousCardEl = cardsContainerEl.querySelector(".previous--card") as HTMLElement;
      const nextCardEl = cardsContainerEl.querySelector(".next--card") as HTMLElement;

      const currentBgImageEl = appBgContainerEl.querySelector(".current--image") as HTMLElement;
      const previousBgImageEl = appBgContainerEl.querySelector(".previous--image") as HTMLElement;
      const nextBgImageEl = appBgContainerEl.querySelector(".next--image") as HTMLElement;

      changeInfo(direction);
      swapCardsClass();

      removeCardEvents(currentCardEl);

      function swapCardsClass() {
        currentCardEl.classList.remove("current--card");

        previousCardEl.classList.remove("previous--card");
        nextCardEl.classList.remove("next--card");

        currentBgImageEl.classList.remove("current--image");
        previousBgImageEl.classList.remove("previous--image");
        nextBgImageEl.classList.remove("next--image");

        currentCardEl.style.zIndex = "50";
        currentBgImageEl.style.zIndex = "-2";

        if (direction === "right") {
          previousCardEl.style.zIndex = "20";
          nextCardEl.style.zIndex = "30";

          nextBgImageEl.style.zIndex = "-1";

          currentCardEl.classList.add("previous--card");
          previousCardEl.classList.add("next--card");
          nextCardEl.classList.add("current--card");

          currentBgImageEl.classList.add("previous--image");
          previousBgImageEl.classList.add("next--image");
          nextBgImageEl.classList.add("current--image");
        } else if (direction === "left") {
          previousCardEl.style.zIndex = "30";
          nextCardEl.style.zIndex = "20";

          previousBgImageEl.style.zIndex = "-1";

          currentCardEl.classList.add("next--card");
          previousCardEl.classList.add("current--card");
          nextCardEl.classList.add("previous--card");

          currentBgImageEl.classList.add("next--image");
          previousBgImageEl.classList.add("current--image");
          nextBgImageEl.classList.add("previous--image");
        }
      }
    }

    function changeInfo(direction: "left" | "right") {
      let currentInfoEl = cardInfosContainerEl.querySelector(".current--info") as HTMLElement;
      let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info") as HTMLElement;
      let nextInfoEl = cardInfosContainerEl.querySelector(".next--info") as HTMLElement;

      gsap.timeline()
        .to([buttons.prev, buttons.next], {
          duration: 0.2,
          opacity: 0.5,
          pointerEvents: "none",
        })
        .to(
          currentInfoEl.querySelectorAll(".text"),
          {
            duration: 0.4,
            stagger: 0.1,
            translateY: "-120px",
            opacity: 0,
          },
          "-="
        )
        .call(() => {
          swapInfosClass();
        })
        .call(() => initCardEvents())
        .fromTo(
          direction === "right"
            ? nextInfoEl.querySelectorAll(".text")
            : previousInfoEl.querySelectorAll(".text"),
          {
            opacity: 0,
            translateY: "40px",
          },
          {
            duration: 0.4,
            stagger: 0.1,
            translateY: "0px",
            opacity: 1,
          }
        )
        .to([buttons.prev, buttons.next], {
          duration: 0.2,
          opacity: 1,
          pointerEvents: "all",
        });

      function swapInfosClass() {
        currentInfoEl.classList.remove("current--info");
        previousInfoEl.classList.remove("previous--info");
        nextInfoEl.classList.remove("next--info");

        if (direction === "right") {
          currentInfoEl.classList.add("previous--info");
          nextInfoEl.classList.add("current--info");
          previousInfoEl.classList.add("next--info");
        } else if (direction === "left") {
          currentInfoEl.classList.add("next--info");
          nextInfoEl.classList.add("previous--info");
          previousInfoEl.classList.add("current--info");
        }
      }
    }

    function updateCard(e: PointerEvent) {
      const card = e.currentTarget as HTMLElement;
      const box = card.getBoundingClientRect();
      const centerPosition = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
      };
      let angle = (Math.atan2(e.pageX - centerPosition.x, 0) * 35) / Math.PI;
      gsap.set(card, {
        "--current-card-rotation-offset": `${angle}deg`,
      });
      const currentInfoEl = cardInfosContainerEl.querySelector(".current--info") as HTMLElement;
      gsap.set(currentInfoEl, {
        rotateY: `${angle}deg`,

      });
    }

    function resetCardTransforms(e: PointerEvent) {
      const card = e.currentTarget as HTMLElement;
      const currentInfoEl = cardInfosContainerEl.querySelector(".current--info") as HTMLElement;
      gsap.set(card, {
        "--current-card-rotation-offset": 0,

      });
      gsap.set(currentInfoEl, {
        rotateY: 0,
      });
    }

    function initCardEvents() {
      const currentCardEl = cardsContainerEl.querySelector(".current--card") as HTMLElement;
      // currentCardEl.style.width = sizeOfSideCard;
      // currentCardEl.style.height = sizeOfSideCard;
      currentCardEl.addEventListener("pointermove", updateCard);
      currentCardEl.addEventListener("pointerout", (e) => {
        resetCardTransforms(e);
      });
    }

    initCardEvents();

    function removeCardEvents(card: HTMLElement) {
      card.removeEventListener("pointermove", updateCard);
    }

    function init() {
      gsap.set(cardsContainerEl.children, {
        "--card-translateY-offset": "100vh",
      });

      const currentInfoTextElements = cardInfosContainerEl.querySelector(".current--info")?.querySelectorAll<HTMLElement>(".text");
      if (currentInfoTextElements) {
        gsap.set(currentInfoTextElements, {
          translateY: "40px",
          opacity: 0,


        });
      }

      gsap.set([buttons.prev, buttons.next], {
        pointerEvents: "none",
        opacity: "0",
      });


      let tl = gsap.timeline();

      tl.to(cardsContainerEl.children, {
        delay: 0.15,
        duration: 0.5,
        stagger: {
          ease: "power4.inOut",
          from: "end",
          amount: 0.1,
        },
        "--card-translateY-offset": "0%",

      })
        .to(cardInfosContainerEl.querySelector(".current--info")!.querySelectorAll(".text"), {
          delay: 0.5,
          duration: 0.4,
          stagger: 0.1,
          opacity: 1,
          translateY: 0,
        })
        .to(
          [buttons.prev, buttons.next],
          {
            duration: 0.4,
            opacity: 1,
            pointerEvents: "all",
          },
          "-=0.4"
        );
    }

    init();
  }
}
