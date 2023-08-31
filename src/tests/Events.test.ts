import request from "supertest";
import { App } from "../app";
import { EventUseCase } from "../useCases/EventUseCase";
import { EventRepository } from "../repositories/EventRepository";
import crypto from "node:crypto";
const app = new App();
const express = app.app;

describe("Event test", () => {
  it("/POST Event", async () => {
    const event = {
      title: "Jorge e Mateus",
      price: [{ sector: "Pista", amount: "20" }],
      categories: ["Show"],
      description: "Evento descrição",
      city: "Belo Horizonte",
      location: {
        latitude: "-19.865867",
        longitude: "-43.9711315",
      },
      coupons: [],
      date: new Date(),
      participants: [],
    };
    const response = await request(express)
      .post("/events")
      .field("title", event.title)
      .field("description", event.description)
      .field("city", event.city)
      .field("coupons", event.coupons)
      .field("categories", event.categories)
      .field("location[latitude]", event.location.latitude)
      .field("location[longitude]", event.location.longitude)
      .field("date", event.date.toISOString())
      .field("price[sector]", event.price[0].sector)
      .field("price[amount]", event.price[0].amount)
      .field("categories", event.categories)
      .attach("banner", "/Users/gabri/Downloads/jorgeemateus.png")
      .attach("flyers", "/Users/gabri/Downloads/flyer1.png")
      .attach("flyers", "/Users/gabri/Downloads/flyer2.png");
    if (response.error) {
      console.log("~ file: Events.test.ts:34 ~ it error", response.error);
    }

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Evento criado com sucesso." });
  });
  it("/GET/:id Get event id", async () => {
    const response = await request(express).get(
      "/events/64ef9feacb4ce3b1a24cf5b7"
    );

    if (response.error) {
      console.log("~ file: Events.test.ts:34 ~ it error", response.error);
    }

    expect(response.status).toBe(200);
  });
  it("/GET/ Get event by location", async () => {
    const response = await request(express).get(
      "/events?latitude=-19.865867&longitude=-43.9711315"
    );

    if (response.error) {
      console.log("~ file: Events.test.ts:34 ~ it error", response.error);
    }

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  it("/GET/ Get event by category", async () => {
    const response = await request(express).get("/events/category/Show");

    if (response.error) {
      console.log("~ file: Events.test.ts:34 ~ it error", response.error);
    }

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  it("/POST event insert user", async () => {
    const response = await request(express)
      .post("/events/64ef9feacb4ce3b1a24cf5b7/participants")
      .send({
        name: "Gabriel",
        email: crypto.randomBytes(10).toString("hex") + "@teste.com",
      });

    if (response.error) {
      console.log("~ file: Events.test.ts:34 ~ it error", response.error);
    }

    expect(response.status).toBe(200);
  });
});

const eventRepository = {
  add: jest.fn(),
  findEventsByCategory: jest.fn(),
  findByLocationAndDate: jest.fn(),
  findEventsByCity: jest.fn(),
  findEventsByName: jest.fn(),
  findEventById: jest.fn(),
  update: jest.fn(),
};
const eventUseCase = new EventUseCase(eventRepository);
const event = {
  title: "Jorge e Mateus",
  price: [{ sector: "Pista", amount: "20" }],
  categories: ["Show"],
  description: "Evento descrição",
  city: "Belo Horizonte",
  location: {
    latitude: "-19.865867",
    longitude: "-43.9711315",
  },
  banner: "banner.png",
  flyers: ["flyer1.png", "flyer2.png"],
  coupons: [],
  date: new Date(),
  participants: [],
};
describe("Unit Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return an array of events by category", async () => {
    eventRepository.findEventsByCategory.mockResolvedValue([event]);
    const result = await eventUseCase.FindEventsByCategory("Show");
    console.log(" ~ file: Events.test.ts:77 ~ it.only ~ result:", result);

    expect(result).toEqual([event]);
  });
  it("should return an array of events by name", async () => {
    eventRepository.findEventsByName.mockResolvedValue([event]);
    const result = await eventUseCase.FindEventsByName("Jorge e Mateus");
    console.log(" ~ file: Events.test.ts:77 ~ it.only ~ result:", result);

    expect(result).toEqual([event]);
    expect(eventRepository.findEventsByName).toHaveBeenCalledWith(
      "Jorge e Mateus"
    );
  });
  it("should return an array a event by Id", async () => {
    eventRepository.findEventById.mockResolvedValueOnce(event);
    const result = await eventUseCase.FindEventById("64ef9feacb4ce3b1a24cf5b7");
    console.log(" ~ file: Events.test.ts:77 ~ it.only ~ result:", result);

    expect(result).toEqual(event);
    expect(eventRepository.findEventById).toHaveBeenCalledWith(
      "64ef9feacb4ce3b1a24cf5b7"
    );
  });
});
