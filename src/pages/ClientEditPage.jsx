import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { updateClient, getClientById } from "../api/clientApi";
import SidebarShort from "../components/SidebarShort";
import { ChevronLeft } from "lucide-react";

const ClientEditPage = () => {
  const { clientId } = useParams();
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    doctorId: loginDetails.user.userId, // Ensure doctorId is set
    birthDate: "",
    gender: "", // Add gender field
  });

  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    getClientById(clientId, loginDetails.token)
      .then((response) => {
        const clientData = response.data;
        setFormData({
          id: clientData.id || "",
          firstName: clientData.firstName || "",
          lastName: clientData.lastName || "",
          email: clientData.email || "",
          phoneNumber: clientData.phoneNumber || "",
          doctorId: loginDetails.user.userId,
          birthDate: clientData.birthDate || "", // Set birthDate from clientData
          gender: clientData.gender || "", // Set gender from clientData
        });
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
        setErr("Error fetching client data.");
      });
  }, [clientId, loginDetails.token, loginDetails.user.userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData };
      const response = await updateClient(
        updatedFormData,
        loginDetails.token,
        clientId
      );
      setFormData(updatedFormData);
      setMessage(`Client ${updatedFormData.firstName} updated successfully`);
      navigate(-1);
    } catch (error) {
      console.error("Update failed:", error);
      setErr("Failed due to an Error.");
    }
  };

  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      <div className="p-5 flex flex-col w-full">
        <div className="flex flex-row">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft size={42} />
          </button>
          <h1>Kunde Bearbeiten</h1>
        </div>

        <Form className="w-6/12 m-3" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formFirstName">
              <Form.Label>Vorname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vorname eingeben"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formLastName">
              <Form.Label>Nachname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nachnamen eingeben"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formBirthDate">
              <Form.Label>Geburtsdatum</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formPhoneNumber">
              <Form.Label>Telefonnummer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefonnummer eingeben"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email eingeben"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGender">
              <Form.Label>Geschlecht</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Männlich</option>
                <option value="female">Weiblich</option>
                <option value="other">Diverse</option>
              </Form.Control>
            </Form.Group>
          </Row>

          <p className="text-lime-500 mt-2">{message}</p>
          <p className="text-red-500 mt-2">{err}</p>
          <button className="custom-button" type="submit">
            Einreichen
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ClientEditPage;
